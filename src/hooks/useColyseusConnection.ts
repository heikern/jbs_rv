import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Client, Room } from 'colyseus.js';
import { setConnected, updateGameState, setStoryId } from '../store/colyseusSlice';

const useColyseusConnection = (wsUrl: string = 'http://192.168.1.157:8080') => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState<Room<any> | null>(null);

  const createRoom = async (roomName: string) => {
    try {
      const client = new Client(wsUrl);
      console.log("Creating room...");
      const createdRoom = await client.create(roomName);
      console.log("Room created:", createdRoom);
      // dispatch(setConnected(true));
      // setRoom(createdRoom);

      // createdRoom.onStateChange((state: any) => {
      //   dispatch(updateGameState(state));
      // });
      
      // createdRoom.onMessage("storyIdChanged", (data: any) => {
      //   dispatch(setStoryId(data.storyId));
      // });
      return createdRoom;
    } catch (error) {
      console.error("Failed to create Colyseus room:", error);
      throw error;
    }
  };

  const joinRoomById = async (roomId: string) => {
    try {
      const client = new Client(wsUrl);
      const joinedRoom = await client.joinById(roomId);
      dispatch(setConnected(true));
      setRoom(joinedRoom);

      joinedRoom.onStateChange((state: any) => {
        dispatch(updateGameState(state));
      });
      
      joinedRoom.onMessage("storyIdChanged", (data: any) => {
        dispatch(setStoryId(data.storyId));
      });

      return joinedRoom;
    } catch (error) {
      console.error("Failed to join Colyseus room by ID:", error);
      throw error;
    }
  };

  return { room, createRoom, joinRoomById };
};

export default useColyseusConnection;
