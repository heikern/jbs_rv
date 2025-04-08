import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';
import { useDispatch } from 'react-redux';
import { setUpAllBingings } from '@/bindings/allBindings';
import { resetGameState } from '@/store/gameSlice';

type RoomType = Room<any>;

interface RoomContextType {
	roomRef: RefObject<RoomType | null>;
	createRoom: (roomName: string, options?: any) => Promise<RoomType>;
	joinRoomWithId: (roomId: string) => Promise<RoomType>;
	reconnectRoom: () => Promise<RoomType | null>;
	leaveRoom: () => Promise<void>;
}

const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps{
	children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({children}) => {
	const roomRef = useRef<RoomType | null>(null);
	const dispatch = useDispatch();

	const attachOnLeaveHandler = (room: RoomType) => {
		room.onLeave(() => {
		  roomRef.current = null;
		  console.log("Room left, roomRef cleared.");
		});
	  };

	const createRoom = async (roomName: string, options?: any) => {
		const room = await client.create(roomName, options);
		await setUpAllBingings(room, dispatch);
		localStorage.setItem("reconnectionToken", room.reconnectionToken);
		roomRef.current = room;
		attachOnLeaveHandler(room);
		return room
	};

	const joinRoomWithId = async (roomId: string) => {
		const room = await client.joinById(roomId);
		await setUpAllBingings(room, dispatch);
		localStorage.setItem("reconnectionToken", room.reconnectionToken);
		roomRef.current = room;
		attachOnLeaveHandler(room);
		return room
		
	}

	 // Attempt to reconnect using the stored reconnection token
	 const reconnectRoom = async (): Promise<RoomType | null> => {
		console.log("Entered reconnectRoom");
		const reconnectionToken = localStorage.getItem("reconnectionToken");
		if (reconnectionToken) {
			console.log("Reconnection token found:", reconnectionToken);
		  try {
			if (roomRef.current){
				roomRef.current = null
			}
			const room = await client.reconnect(reconnectionToken);
			localStorage.setItem("reconnectionToken", room.reconnectionToken);
			roomRef.current = room;
			await setUpAllBingings(room, dispatch);
			attachOnLeaveHandler(room);
			console.log("Reconnected to room:", room.roomId);
			
			return room;
		  } catch (error) {
			console.error("Failed to reconnect:", error);
			// Remove stale token if reconnection fails
			localStorage.removeItem("reconnectionToken");
			return null;
		  }
		}
		console.log("No reconnection token found.");
		return null;
	  };

	  const leaveRoom = async () => {
		if (roomRef.current) {
			roomRef.current.removeAllListeners();
			localStorage.removeItem("reconnectionToken");
			await roomRef.current.leave();
			roomRef.current = null;
			console.log("Left room and cleared roomRef.");
			dispatch(resetGameState());
		}
	  };

	  const initialReconnectCalledRef = useRef(false);

	  useEffect(() => {
		if (!initialReconnectCalledRef.current) {
		  initialReconnectCalledRef.current = true;
		  (async () => {
			await reconnectRoom();
		  })();
		}
	  }, []);

	  useEffect(() => {
		const handleOnline = async () => {
		  console.log("Network connection restored, attempting reconnection");
		  await reconnectRoom();
		};
		
		window.addEventListener('online', handleOnline);
		return () => window.removeEventListener('online', handleOnline);
	  }, []);

	  useEffect(() => {
		const handleFocus = async () => {
		  if (!roomRef.current) {
			console.log("Window refocused without active room, attempting reconnection");
			await reconnectRoom();
		  }
		};
		
		window.addEventListener('focus', handleFocus);
		return () => window.removeEventListener('focus', handleFocus);
	  }, []);

	  useEffect(() => {
		const handleVisibilityChange = async () => {
		  if (document.visibilityState === 'visible' && !roomRef.current) {
			console.log("App became visible, attempting reconnection");
			await reconnectRoom();
		  }
		};
		
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	  }, []);

	  useEffect(() => {
		// Only runs if Network Information API is available
		if ('connection' in navigator) {
		  const connection = (navigator as any).connection;
		  
		  const handleConnectionChange = async () => {
			console.log("Network type changed to:", connection.effectiveType);
			if (!roomRef.current) {
			  await reconnectRoom();
			}
		  };
		  
		  connection.addEventListener('change', handleConnectionChange);
		  return () => connection.removeEventListener('change', handleConnectionChange);
		}
	  }, []);

	  useEffect(() => {
		let reconnectionAttemptTimerId: number | null = null;
		let reconnectionAttempts = 0;
		const MAX_RECONNECTION_ATTEMPTS = 5;
		
		const handleVisibilityChange = async () => {
		  // Clear any pending reconnection attempts when visibility changes
		  if (reconnectionAttemptTimerId) {
			window.clearTimeout(reconnectionAttemptTimerId);
			reconnectionAttemptTimerId = null;
		  }
		  
		  if (document.visibilityState === 'visible') {
			console.log("Screen unlocked/App became visible");
			
			// Reset reconnection attempts
			reconnectionAttempts = 0;
			
			// Check if connection is still alive
			if (!roomRef.current) {
			  console.log("Connection lost while screen was locked, reconnecting");
			  
			  // Implement progressive retry with exponential backoff
			  const attemptReconnection = async () => {
				try {
				  const room = await reconnectRoom();
				  if (room) {
					console.log("Successfully reconnected after screen unlock");
					reconnectionAttempts = 0;
					return;
				  }
				} catch (error) {
				  console.error("Reconnection attempt failed:", error);
				}
				
				// If unsuccessful and we haven't exceeded max attempts, try again with backoff
				if (reconnectionAttempts < MAX_RECONNECTION_ATTEMPTS) {
				  reconnectionAttempts++;
				  const delayMs = Math.min(1000 * Math.pow(2, reconnectionAttempts), 30000); // Cap at 30 seconds
				  console.log(`Scheduling reconnection attempt ${reconnectionAttempts} in ${delayMs}ms`);
				  reconnectionAttemptTimerId = window.setTimeout(attemptReconnection, delayMs);
				}
			  };
			  
			  await attemptReconnection();
			}
		  } else if (document.visibilityState === 'hidden') {
			console.log("Screen locked/App hidden");
			// Optionally do cleanup or state saving when screen is locked
		  }
		};
		
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
		  document.removeEventListener('visibilitychange', handleVisibilityChange);
		  if (reconnectionAttemptTimerId) {
			window.clearTimeout(reconnectionAttemptTimerId);
		  }
		};
	  }, []);

	  useEffect(() => {
		let heartbeatInterval: number | null = null;
		
		if (roomRef.current) {
		  // Send a heartbeat every 30 seconds to check connection
		  heartbeatInterval = window.setInterval(() => {
			if (roomRef.current) {
			  try {
				// Use a lightweight message to check connection
				roomRef.current.send("heartbeat");
			  } catch (e) {
				console.warn("Heartbeat failed, connection may be lost");
				reconnectRoom();
			  }
			}
		  }, 30000);
		}
		
		return () => {
		  if (heartbeatInterval) window.clearInterval(heartbeatInterval);
		};
	  }, [roomRef.current]);

	return (
		<RoomContext.Provider value={{roomRef, createRoom, joinRoomWithId, reconnectRoom, leaveRoom}}>
			{children}
		</RoomContext.Provider>
	)

};


export const useRoomContext = (): RoomContextType => {
	const context = useContext(RoomContext);
	if (!context) {
		throw new Error('useRoomContext must be used within a RoomProvider');
	}
	return context;
}

export const useRoom = (): RoomType | null => {
	const context = useRoomContext();
	return context.roomRef.current;
}

