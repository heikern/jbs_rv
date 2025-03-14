import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject, use } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';

type RoomType = Room<any>;

interface RoomContextType {
	roomRef: RefObject<RoomType | null>;
	createRoom: (roomName: string, options: any) => void;
	joinRoomWithId: (roomId: string) => void;
}

const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps{
	children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({children}) => {
	const roomRef = useRef<RoomType | null>(null);

	const createRoom = async (roomName: string, options: any) => {
		const room = await client.create(roomName, options);
		roomRef.current = room;
	};

	const joinRoomWithId = async (roomId: string) => {
		const room = await client.joinById(roomId);
		roomRef.current = room;
	}

	useEffect(() => {
		return () => {
			roomRef.current?.leave();
			roomRef.current = null;
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

