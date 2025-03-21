import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React, { useEffect } from 'react';
import PlayerNameForm from '../components/PlayerNameForm';
import { setServerPlayerName } from '@/colyseus/messageLib';
import { useRoom } from '@/contexts/RoomContext';
import { useSelector } from 'react-redux';
import PlayersInLobby from '@/components/PlayersInLobby';

const LobbyPage: React.FC = () => {
  const room = useRoom();
  const sessionId = room?.sessionId;
  const storyTitle = useSelector((state: any) => state.game.storyMetadata.title);
  const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
  const playerState = playerStateArray.find((player: any) => player.playerSessionId === sessionId);
  const numPlayers = useSelector((state: any) => state.game.storyMetadata.numberOfPlayers);
  console.log("numPlayers: ",numPlayers)
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
      <h1>Playing {storyTitle}</h1>
      { !playerState || playerState.playerName === '' ? (
        <PlayerNameForm onSubmit={handleSubmit}/>
      ): (
        <div>
          <h3>Hello {playerState?.playerName}</h3>
          <div className="flex items-center space-x-2">
            <p>RoomId</p>
            {room && <LabelWithCopy value={room?.roomId}/>}
          </div>
          <h4>{playerStateArray.length}/ {numPlayers} Players </h4>
          <PlayersInLobby players={playerStateArray}/>
        </div>
      )}
    </div>
  );
};

export default LobbyPage;