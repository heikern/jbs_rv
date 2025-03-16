import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React from 'react';
import PlayerNameForm from '../components/PlayerNameForm';
import { useState } from 'react';
import { setServerPlayerName } from '@/colyseus/messageLib';
import { useRoom } from '@/contexts/RoomContext';
import { useSelector } from 'react-redux';


const LobbyPage: React.FC = () => {
  const [playerName, setPlayerName]  = useState<string| null>(null)
  const room = useRoom();
  const playerState = useSelector((state: any) => state.game.playerState);

  const handleSubmit = (name: string) => {
    setPlayerName(name)
    if (room){
      setServerPlayerName(room,name);
    }
    console.log("player name: ", name)
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
      { playerName   === null ? (
        <PlayerNameForm onSubmit={handleSubmit}/>
      ): (
        <div>
          <h1>key: {playerState.playerName}</h1>
          <div className="flex items-center space-x-2">
            <p>RoomId</p>
          </div>
        </div>
      )}

      

    </div>
  );
};

export default LobbyPage;