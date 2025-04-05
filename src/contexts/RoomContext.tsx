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

	  useEffect(() => {
		(async () => {
		  await reconnectRoom();
		})();
		// Note: we no longer register onLeave here because each room gets its own handler after creation or reconnection.
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

