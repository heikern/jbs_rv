import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CounterForm from "@/components/CounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";
import { useRoomContext } from "@/contexts/RoomContext";
import {setEnterLobby} from "@/colyseus/messageLib";


export default function CreateGamePage() {
	const navigate = useNavigate();
	const {createRoom} = useRoomContext()
	const [numPlayers, setNumPlayers] = useState<number | null>(null);

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
		navigate("/lobby");
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
