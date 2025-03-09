import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseusClient';

interface ColyseusContextValue {
	// current room persists across pages
	room: Room | null;
	createRoom: (roomName: string, options?: any) => Promise<Room>;
	joinRoomById: (roomId: string, options?: any) => Promise<Room>;
	leaveRoom: () => void;
}

const ColyseusContext = createContext<ColyseusContextValue | undefined>(undefined);

export const ColyseusProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [room, setRoom] = useState<Room | null>(null);

	const createRoom = async (roomName: string, options?: any) => {
		const newRoom = await client.create(roomName, options);
		// Save room id for reconnection
		sessionStorage.setItem('roomId', newRoom.sessionId);
		setRoom(newRoom);
		return newRoom;
	};

	const joinRoomById = async (roomId: string, options?: any) => {
		const newRoom = await client.joinById(roomId, options);
		// Save room id for reconnection
		sessionStorage.setItem('roomId', newRoom.sessionId);
		setRoom(newRoom);
		return newRoom;
	};

	const leaveRoom = () => {
		room?.leave();
		sessionStorage.removeItem('roomId');
		setRoom(null);
	};

	// On provider mount, try to rejoin if a room id exists.
	useEffect(() => {
		if (!room) {
			const storedRoomId = sessionStorage.getItem('roomId');
			if (storedRoomId) {
				joinRoomById(storedRoomId).catch(err => console.error("Reconnection error:", err));
			}
		}
	}, [room]);

	useEffect(() => {
		if (room) {
			// Subscribe to onMessage events
			room.onMessage("yourMessageEvent", (data) => {
				// ...handle message logic...
				console.log("Received message:", data);
			});

			// Subscribe to state changes
			const onStateChangeHandler = (state: any) => {
				// ...handle state changes...
				console.log("State changed:", state);
			};
			room.onStateChange(onStateChangeHandler);

			// Cleanup subscription when room changes or component unmounts
			return () => {
				// Remove onMessage listeners if your client API supports it, otherwise use a flag.
				// room.removeListener("yourMessageEvent");
				
				// Remove onStateChange listeners if available
				// room.offStateChange(onStateChangeHandler);
			};
		}
	}, [room]);

	return (
		<ColyseusContext.Provider value={{ room, createRoom, joinRoomById, leaveRoom }}>
			{children}
		</ColyseusContext.Provider>
	);
};

export const useColyseus = () => {
	const context = useContext(ColyseusContext);
	if (!context) throw new Error('useColyseus must be used within a ColyseusProvider');
	return context;
};
