import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CounterForm from "@/components/CounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";
import { useRoomContext } from "@/contexts/RoomContext";
import {setEnterLobby} from "@/colyseus/messageLib";
import { GameStateEnum } from "@/types/gameStates";
import { useSelector } from "react-redux";


export default function CreateGamePage() {
	const navigate = useNavigate();
	const {createRoom} = useRoomContext()
	const [numPlayers, setNumPlayers] = useState<number | null>(null);

	// Subscribe to the game state from Redux
    const gameState = useSelector((state: any) => state.game.gameState);

	// Watch for changes in game state and navigate when it becomes "lobby"
    useEffect(() => {
        if (gameState === GameStateEnum.Lobby) {
            console.log("Game state is now lobby, navigating...");
            navigate("/lobby");
        }
    }, [gameState, navigate]);
	
	const handleOnSubmit = (numPlayers: number) => {
		setNumPlayers(numPlayers)
	};

	const handleOnCancel = () => {
		navigate(-1);
	};

	async function handleCreateGame(storyId: string) {
		console.log("Creating game with storyId: ", storyId);
		const room = await createRoom("my_room", {storyId: storyId});
		setEnterLobby(room);
	}

	return (
		// <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
	<div className="min-h-screen w-screen bg-black text-white flex flex-col">
      <TopBar />
		<div className="flex-grow flex items-center justify-center">
			{numPlayers === null ? (
				<div className="w-full flex justify-center items-center">
					<CounterForm onSubmit={handleOnSubmit} 
								 onCancel={handleOnCancel} 
								 selectItems={[2, 3, 4, 5]}
								 />
				</div>
			) : (
			<div className="w-full flex justify-center items-center px-8">
					<StoryList onCreateGame={handleCreateGame} numPlayers = {numPlayers}/>
			</div>
			)}
		</div>
	</div>
	);
}
