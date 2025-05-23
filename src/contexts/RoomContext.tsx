import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';
import { useDispatch } from 'react-redux';
import { setUpAllBingings } from '@/bindings/allBindings';
import { resetGameState } from '@/store/gameSlice';
import { registerRoomMessageHandlers } from '@/colyseus/messageLib';

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
		console.log("createRoom reconnectionToken: ", room.reconnectionToken);
		localStorage.setItem("reconnectionToken", room.reconnectionToken);

		registerRoomMessageHandlers(room);
		console.log("setting up all bindings");
		await setUpAllBingings(room, dispatch);
		console.log("binding successful")
		roomRef.current = room;
		attachOnLeaveHandler(room);
		return room
	};

	const joinRoomWithId = async (roomId: string) => {
		const room = await client.joinById(roomId);
		console.log("joinRoom reconnectionToken: ", room.reconnectionToken);
		localStorage.setItem("reconnectionToken", room.reconnectionToken);

		registerRoomMessageHandlers(room);

		await setUpAllBingings(room, dispatch);
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
			const room = await client.reconnect(reconnectionToken);
			console.log("reconnectionToken: ", room.reconnectionToken);
			localStorage.setItem("reconnectionToken", room.reconnectionToken);
			registerRoomMessageHandlers(room);
			roomRef.current = room;
			await setUpAllBingings(room, dispatch);
			attachOnLeaveHandler(room);
			console.log("Reconnected to room:", room.roomId);
			return room;
			} catch (error) {
			console.error("Failed to reconnect. Leaving room:", error);

			await leaveRoom();
			return null;
			}
		}

		const playerToken = localStorage.getItem("playerToken");
		if (playerToken){
			try{
				const room = await client.join("my_room",{playerToken: playerToken});
				console.log("Joined room using playerToken:", room.roomId);
				localStorage.setItem("reconnectionToken", room.reconnectionToken);
				registerRoomMessageHandlers(room);
				await setUpAllBingings(room, dispatch);
				roomRef.current = room;
				attachOnLeaveHandler(room);
				return room;
			} catch (error) {
				console.error("Failed to join room using playerToken:", error);
			}
			
		}

		// If neither token is available or both attempts failed
		console.log("No valid tokens available for reconnection.");
		localStorage.removeItem("reconnectionToken");
		localStorage.removeItem("playerToken");
		await leaveRoom();
		return null;
	};

	const leaveRoom = async () => {
	if (roomRef.current) {
		console.log("Leaving room:", roomRef.current.roomId);
		roomRef.current.removeAllListeners();
		localStorage.removeItem("reconnectionToken");
		await roomRef.current.leave();
		roomRef.current = null;
		console.log("Left room and cleared roomRef.");
		dispatch(resetGameState());
	}
	};
	const hasTriedReconnect = useRef(false);
	useEffect(() => {
		if (hasTriedReconnect.current){return;};
		hasTriedReconnect.current = true;
		const tryReconnect = async () => {
			console.log("Attempting to reconnect on page load...");
			await reconnectRoom();
		};
		tryReconnect();
	}, []);

	// Add to your RoomProvider component
	useEffect(() => {
		const handleVisibilityChange = async () => {
		if (document.visibilityState === 'visible') {
			// App has returned to the foreground
			console.log("App returned to foreground, checking connection...");
			
			// Check if we need to reconnect (room exists but connection might be stale)
			if (!roomRef.current || !roomRef.current.connection.isOpen) {
			console.log("Connection lost while app was in background, attempting to reconnect...");
			await reconnectRoom();
			}
		}
		};
	
		// Add visibility change listener
		document.addEventListener("visibilitychange", handleVisibilityChange);
		
		// Cleanup
		return () => {
		document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

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

