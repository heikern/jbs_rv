import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React from 'react';
import { useSelector} from 'react-redux';
import PlayerNameForm from '../components/PlayerNameForm';
import {usePlayerData} from '@/hooks/playerStateChange';
import { useState } from 'react';


const LobbyPage: React.FC = () => {
  const roomId = useSelector((state: any) => state.game.roomId);
  const sessionId = useSelector((state: any) => state.game.sessionId);
  const selectedStory = useSelector((state:any) => state.firebase.selectedStory);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const players = usePlayerData(room);
  const player = players.find((player) => player.id === sessionId);

  const handleSubmit = (name: string) => {
    setPlayerName(name);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
      { player === null ? (
        <PlayerNameForm onSubmit={handleSubmit}/>
      ): (
        <div>
          <h1>{selectedStory.title}</h1>
          <div className="flex items-center space-x-2">
            <p>RoomId</p>
            <LabelWithCopy value={roomId} />
            {players.map((player) => (
              <li key={player.id}>{player.playerName}</li>
            ))}
          </div>
        </div>
      )}

      

    </div>
  );
};

export default LobbyPage;