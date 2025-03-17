import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React, { useEffect } from 'react';
import SingleStringForm from '../components/SingleStringForm';
import { setServerPlayerName } from '@/colyseus/messageLib';
import { useRoom } from '@/contexts/RoomContext';
import { useSelector } from 'react-redux';


const LobbyPage: React.FC = () => {
  const room = useRoom();
  const sessionId = room?.sessionId;
  const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
  const playerState = playerStateArray.find((player: any) => player.playerSessionId === sessionId);
  console.log("playerState Array: ",playerStateArray)

  useEffect(()=>{
    console.log("playerState: ", playerState)
  },[playerStateArray])
  
  const handleSubmit = (name: string) => {
    if (room){
      setServerPlayerName(room,name);
    }
    console.log("player name: ", name)
    console.log("playerState: ", playerState)
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
      { !playerState || playerState.playerName === '' ? (
        <SingleStringForm onSubmit={handleSubmit} placeholder={'Enter your player name'}/>
      ): (
        <div>
          <h1>Hello {playerState?.playerName}</h1>
          <div className="flex items-center space-x-2">
            <p>RoomId</p>
            {room && <LabelWithCopy value={room?.roomId}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyPage;