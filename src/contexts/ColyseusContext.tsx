import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';
import { setRoomId } from '@/store/gameSlice';
import { useDispatch } from 'react-redux';


type RoomType = Room<any>;

const RoomContext = createContext<RefObject<RoomType | null> | null>(null);

interface RoomProviderProps{
	roomName: string;
	children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({roomName, children}) => {
	const roomRef = useRef<RoomType | null>(null);

	const createRoom = async (roomName: string, options: any) => {
		const room = await client.create(roomName, options);
		roomRef.current = room;
	};

};

