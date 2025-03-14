import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumPlayers } from "@/store/appSlice";
import { PlayerCounterForm } from "@/components/PlayerCounterForm";
import StoryList from "@/components/StoryList";
import TopBar from "@/components/TopBar";


export default function CreateGamePage() {
	const dispatch = useDispatch();
	const numPlayers = useSelector((state: any) => state.game.numPlayers);

	useEffect(() => {
		// On loading the page, set numPlayers to null
		dispatch(setNumPlayers(null));
	}, [dispatch]);

	return (
		<div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <TopBar />
			{numPlayers === null ? (
				<div className="w-full flex justify-center items-center">
					<PlayerCounterForm />
				</div>
			) : (
        <div className="w-full flex justify-center items-center px-8">
				<StoryList />
        </div>
			)}
		</div>
	);
}
