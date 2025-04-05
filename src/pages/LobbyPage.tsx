import TopBar from '@/components/TopBar';
import LabelWithCopy from '@/components/labelWithCopy';
import React, {useEffect } from 'react';
import PlayerNameForm from '../components/PlayerNameForm';
import { setServerPlayerName, 
         setPlayerIsReady, 
         setStartGame, 
         setRandomizeRoles } from '@/colyseus/messageLib';
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
  const gameState = useSelector((state: any) => state.game.gameState);
  const playerState = playerStateArray.find((player: any) => player.playerSessionId === sessionId);
  const numPlayers = useSelector((state: any) => state.game.storyMetadata.numberOfPlayers);
  const navigate = useNavigate();

  console.log("numPlayers: ",numPlayers)
  console.log("playerState Array: ",playerStateArray)


  useEffect(()=>{
    console.log("playerState: ", playerState)
    console.log("gameState: ", gameState)
    if (gameState === "InGame"){
      navigate('/game')
    }
  },[playerStateArray,gameState])
  
  const handleSubmit = (name: string) => {
    if (room){
      setServerPlayerName(room,name);
      if (room?.sessionId === hostSessionId){
        setPlayerIsReady(room, true)
        }
    }
    console.log("player name: ", name)
    console.log("playerState: ", playerState)
  };

  const handleStartGame = () => {
    setStartGame(room)
    setRandomizeRoles(room)
    console.log("Starting game")
    navigate('/game')
  }

  const handleIsReady = () => {
    setPlayerIsReady(room, true)
    console.log("Player is ready")  
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col">
      {/* Top elements: always at the top */}
      <TopBar />
      <div className="w-screen flex flex-col items-center justify-center">
        <h1>{storyTitle}</h1>
        <h4>{playerStateArray.length} of {numPlayers} players in lobby </h4>
      </div>
      
      {/* Container for the rest of the content, vertically centered */}
      <div className="flex-grow flex items-center justify-center">
        { !playerState || playerState.playerName === '' ? (
          <PlayerNameForm onSubmit={handleSubmit}/>
        ) : (
          <div>            
            <PlayersInLobby players={playerStateArray}/>
          </div>
        )}
      </div>
      {room?.sessionId === hostSessionId ? <Button 
          className="w-20 flex justify-center items-center mx-auto"
          onClick={handleStartGame}
          disabled={playerStateArray.length !== numPlayers || playerStateArray.some((player: any) =>  player.isReady === false)}
          variant={playerStateArray.length === numPlayers ? 'outline' : 'default'}
        >
          Start Game
      </Button> : <Button 
          className="w-20 flex justify-center items-center mx-auto"
          onClick={handleIsReady}
          disabled={playerState?.playerName === ''}
          variant={playerStateArray.length === numPlayers ? 'outline' : 'default'}
        >
          Ready
      </Button>}
      <div>

      </div>
      <div className="mt-auto bg-black text-white text-xs flex items-center justify-center p-4">
        <p>RoomId:  {room && <LabelWithCopy value={room?.roomId}/>}</p>
        
      </div>
    </div>
  );
};

export default LobbyPage;