import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CounterForm from "@/components/CounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";
import { useRoomContext } from "@/contexts/RoomContext";
import { updateRoomMetaData } from "@/store/gameSlice";
import { setupGameBindings } from "@/bindings/playerBindings";
import storyMetaDataBinding from "@/bindings/storyMetaDataBinding";
import { useDispatch } from "react-redux";

export default function CreateGamePage() {
	const navigate = useNavigate();
	const {createRoom} = useRoomContext()
	const [numPlayers, setNumPlayers] = useState<number | null>(null);
	const dispatch = useDispatch();

	const handleOnSubmit = (numPlayers: number) => {
		setNumPlayers(numPlayers)
	};

	const handleOnCancel = () => {
		navigate(-1);
	};

	async function handleCreateGame(storyId: string) {
		console.log("Creating game with storyId: ", storyId);
		const room = await createRoom("my_room", {storyId: storyId});
		room.onStateChange.once(()=>{
			const plainMetadata = JSON.parse(JSON.stringify(room.state.storyMetadata));
			console.log("plainMetadata: ", plainMetadata);
			dispatch(updateRoomMetaData(plainMetadata));
		})
		setupGameBindings(room, dispatch);
		storyMetaDataBinding(room, dispatch);
		
		navigate("/lobby");
	}

	return (
		<div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
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
	);
}
