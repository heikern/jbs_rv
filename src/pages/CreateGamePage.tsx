import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumPlayers } from "@/store/gameSlice";
import { useNavigate } from "react-router-dom";
import CounterForm from "@/components/CounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";
import { useRoomContext } from "@/contexts/RoomContext";
import { setupGameBindings } from "@/bindings/playerBindings";


export default function CreateGamePage() {
	const dispatch = useDispatch();
	const numPlayers = useSelector((state: any) => state.game.numPlayers);
	const navigate = useNavigate();
	const {createRoom} = useRoomContext()

	useEffect(() => {
		// On loading the page, set numPlayers to null
		dispatch(setNumPlayers(null));
	}, [dispatch]);

	const handleOnSubmit = (numPlayers: number) => {
		dispatch(setNumPlayers(numPlayers));
	};

	const handleOnCancel = () => {
		navigate(-1);
	};

	async function handleCreateGame(storyId: string) {
		console.log("Creating game with storyId within page: ", storyId);
		const room = await createRoom("my_room", {storyId: storyId});
		setupGameBindings(room, dispatch);
		navigate("/lobby");
	}

	return (
		<div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
			{numPlayers === null ? (
				<div className="w-full flex justify-center items-center">
					<CounterForm onSubmit={handleOnSubmit} 
								 onCancel={handleOnCancel} 
								 selectItems={[3, 4, 5]}
								 />
				</div>
			) : (
        <div className="w-full flex justify-center items-center px-8">
				<StoryList onCreateGame={handleCreateGame}/>
        </div>
			)}
		</div>
	);
}
