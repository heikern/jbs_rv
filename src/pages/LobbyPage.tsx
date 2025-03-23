import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React, { useEffect } from 'react';
import PlayerNameForm from '../components/PlayerNameForm';
import { setServerPlayerName, setPlayerIsReady } from '@/colyseus/messageLib';
import { useRoom } from '@/contexts/RoomContext';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import PlayersInLobby from '@/components/PlayersInLobby';
import { useNavigate } from 'react-router-dom';

const LobbyPage: React.FC = () => {
  const room = useRoom();
  const sessionId = room?.sessionId;
  const hostSessionId = useSelector((state: any) => state.game.hostSessionId);
  const storyTitle = useSelector((state: any) => state.game.storyMetadata.title);
  const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
  const playerState = playerStateArray.find((player: any) => player.playerSessionId === sessionId);
  const numPlayers = useSelector((state: any) => state.game.storyMetadata.numberOfPlayers);
  const navigate = useNavigate();

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

  const handleStartGameIsReady = () => {
    setPlayerIsReady(room, true)
    console.log("Starting game")
    navigate('/game')
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col">
      {/* Top elements: always at the top */}
      <TopBar />
      <div className="w-screen flex items-center justify-center">
        <h1>{storyTitle}</h1>
      </div>
      
      {/* Container for the rest of the content, vertically centered */}
      <div className="flex-grow flex items-center justify-center">
        { !playerState || playerState.playerName === '' ? (
          <PlayerNameForm onSubmit={handleSubmit}/>
        ) : (
          <div>
            <h3>Hello {playerState?.playerName}</h3>
            <div className="flex items-center space-x-2">
              <p>RoomId</p>
              {room && <LabelWithCopy value={room?.roomId}/>}
            </div>
            <h4>{playerStateArray.length}/ {numPlayers} Players </h4>
            <PlayersInLobby players={playerStateArray}/>
            <Button 
              onClick={handleStartGameIsReady}
              disabled={playerStateArray.length !== numPlayers}
              variant={playerStateArray.length === numPlayers ? 'outline' : 'default'}
            >
              Start Game
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // return (
  //   <>
  //   <div className="min-h-screen w-screen bg-black text-white flex flex-col">
  //   {/* Top elements: always at the top */}
  //   <TopBar />
  //   <div className="mt-4">
  //     <h1>Playing {storyTitle}</h1>
  //   </div>
  //   </div>

  //   <div className="flex-grow flex items-center justify-center">
      
  //     { !playerState || playerState.playerName === '' ? (
  //       <PlayerNameForm onSubmit={handleSubmit}/>
  //     ): (
  //       <div>
  //         <h3>Hello {playerState?.playerName}</h3>
  //         <div className="flex items-center space-x-2">
  //           <p>RoomId</p>
  //           {room && <LabelWithCopy value={room?.roomId}/>}
  //         </div>
  //         <h4>{playerStateArray.length}/ {numPlayers} Players </h4>
  //         <PlayersInLobby players={playerStateArray}/>
  //         <Button 
  //           onClick={handleStartGameIsReady}
  //           disabled={playerStateArray.length !== numPlayers}
  //           variant={playerStateArray.length === numPlayers ? 'outline' : 'default'}
  //           >
  //             {/* {room?.sessionId === hostSessionId ? 'Start Game' : 'Ready'} */}
  //             Start Game
  //           </Button>
  //       </div>
  //     )}
  //   </div>
  //   </>
  // );
};

export default LobbyPage;