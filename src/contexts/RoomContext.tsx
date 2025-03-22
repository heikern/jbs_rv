import React, { createContext, useContext, useRef, useEffect, ReactNode, RefObject } from 'react';
import { Room } from 'colyseus.js';
import { client } from '../colyseus/colyseusClient';
import { useDispatch } from 'react-redux';
import { updateRoomMetaData } from '../store/gameSlice';
import { setupGameBindings } from '../bindings/playerBindings';
import storyMetaDataBinding from '../bindings/storyMetaDataBinding';

type RoomType = Room<any>;

interface RoomContextType {
	roomRef: RefObject<RoomType | null>;
	createRoom: (roomName: string, options?: any) => Promise<RoomType>;
	joinRoomWithId: (roomId: string) => Promise<RoomType>;
	reconnectRoom: () => Promise<RoomType | null>;
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
		localStorage.setItem("reconnectionToken", room.reconnectionToken);
		roomRef.current = room;
		return room
	};

	const joinRoomWithId = async (roomId: string) => {
		const room = await client.joinById(roomId);
		localStorage.setItem("reconnectionToken", room.reconnectionToken);
		roomRef.current = room;
		return room
		
	}

	 // Attempt to reconnect using the stored reconnection token
	 const reconnectRoom = async (): Promise<RoomType | null> => {
		const reconnectionToken = localStorage.getItem("reconnectionToken");
		if (reconnectionToken) {
		  try {
			if (roomRef.current){
				roomRef.current = null
			}
			const room = await client.reconnect(reconnectionToken);
			localStorage.setItem("reconnectionToken", room.reconnectionToken);
			roomRef.current = room;
			console.log("Reconnected to room:", room.roomId);
			room.onStateChange.once(()=>{
				const plainMetadata = JSON.parse(JSON.stringify((room.state as any).storyMetadata));
				console.log("plainMetadata: ", plainMetadata);
				dispatch(updateRoomMetaData(plainMetadata));
			})
			setupGameBindings(room, dispatch);
			storyMetaDataBinding(room, dispatch);
			return room;
		  } catch (error) {
			console.error("Failed to reconnect:", error);
			// Remove stale token if reconnection fails
			localStorage.removeItem("reconnectionToken");
			return null;
		  }
		}
		return null;
	  };

	useEffect(() => {

		(async () => {
			await reconnectRoom();
		  })();

		if (roomRef.current) {
			const room = roomRef.current;
			room.onLeave(() => {
				roomRef.current = null;
			});
		}

		return () => {
		};
	}	, []);

	return (
		<RoomContext.Provider value={{roomRef, createRoom, joinRoomWithId, reconnectRoom}}>
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

