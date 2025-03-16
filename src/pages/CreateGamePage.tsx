import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumPlayers } from "@/store/gameSlice";
import { useNavigate } from "react-router-dom";
import CounterForm from "@/components/CounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";


export default function CreateGamePage() {
	const dispatch = useDispatch();
	const numPlayers = useSelector((state: any) => state.game.numPlayers);
	const navigate = useNavigate();

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
				<StoryList />
        </div>
			)}
		</div>
	);
}
