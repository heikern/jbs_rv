import React, { createContext, useContext, useState } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseusClient';

interface ColyseusContextValue {
	// current room persists across pages
	room: Room | null;
	joinRoom: (roomName: string, options?: any) => Promise<Room>;
	leaveRoom: () => void;
}

const ColyseusContext = createContext<ColyseusContextValue | undefined>(undefined);

export const ColyseusProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [room, setRoom] = useState<Room | null>(null);

	const joinRoom = async (roomName: string, options?: any) => {
		const newRoom = await client.joinOrCreate(roomName, options);
		setRoom(newRoom);
		return newRoom;
	};

	const leaveRoom = () => {
		room?.leave();
		setRoom(null);
	};

	return (
		<ColyseusContext.Provider value={{ room, joinRoom, leaveRoom }}>
			{children}
		</ColyseusContext.Provider>
	);
};

export const useColyseus = () => {
	const context = useContext(ColyseusContext);
	if (!context) throw new Error('useColyseus must be used within a ColyseusProvider');
	return context;
};
