import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';
import { useDispatch } from 'react-redux';
import { removePlayerState } from '../store/gameSlice';

type RoomType = Room<any>;

interface RoomContextType {
	roomRef: RefObject<RoomType | null>;
	createRoom: (roomName: string, options?: any) => Promise<RoomType>;
	joinRoomWithId: (roomId: string) => Promise<RoomType>;
}

const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps{
	children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({children}) => {
	const roomRef = useRef<RoomType | null>(null);
	const dispatch = useDispatch();

	const createRoom = async (roomName: string, options?: any) => {
		const room = await client.create(roomName, options);
		roomRef.current = room;
		return room
	};

	const joinRoomWithId = async (roomId: string) => {
		const room = await client.joinById(roomId);
		roomRef.current = room;
		return room
		
	}

	useEffect(() => {

		if (roomRef.current) {
			const room = roomRef.current;
			room.onLeave(() => {
				dispatch(removePlayerState({playerSessionId: room.sessionId}));
				roomRef.current = null;
			});

		}

		const handleBeforeUnload = () => {
			dispatch(removePlayerState({playerSessionId: roomRef.current?.sessionId}));
			roomRef.current?.leave()
		};

		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		};
	}	, []);

	return (
		<RoomContext.Provider value={{roomRef, createRoom, joinRoomWithId}}>
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

