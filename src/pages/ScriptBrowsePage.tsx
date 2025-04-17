import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import StoryList from '@/components/StoryList';
import TopBar from '@/components/TopBar';
import {setEnterLobby} from "@/colyseus/messageLib";
import { useRoomContext } from "@/contexts/RoomContext";
import { GameStateEnum } from "@/types/gameStates";
import { useNavigate } from 'react-router-dom';

const ScriptBrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const {createRoom} = useRoomContext()
  const { loading, error } = useSelector((state: RootState) => state.firebase);

  // Subscribe to the game state from Redux
  const gameState = useSelector((state: any) => state.game.gameState);

  useEffect(() => {
      // On loading the page, set numPlayers to null
    if (gameState === GameStateEnum.Lobby) {
                console.log("Game state is now lobby, navigating...");
                navigate("/lobby");
            }
    }, [gameState, navigate]);

  async function handleCreateGame(storyId: string) {
      console.log("Creating game with storyId: ", storyId);
      const room = await createRoom("my_room", {storyId: storyId});
      setEnterLobby(room);
    }

  return (
    <div className="min-h-screen flex flex-col w-screen bg-black text-white">
      <TopBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">JBS Script Catalogue</h1>
        {loading && <p>Loading adventures...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      <div className="flex-1 overflow-y-auto px-8">
        <StoryList onCreateGame={handleCreateGame} numPlayers={null}/>
      </div>
    </div>
  );
};

export default ScriptBrowsePage;