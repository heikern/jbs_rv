import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function BottomToolbar() {
  // Get selectedGameId from game state and adventures from firebase state
  const selectedGameId = useSelector((state: RootState) => state.game.selectedGameId);
  const adventures = useSelector((state: RootState) => state.firebase.adventures);
  
  // Find the adventure based on selectedGameId
  const selectedAdventure = selectedGameId 
    ? adventures?.find((adventure: any) => Number(adventure.id) === selectedGameId)
    : null;
    
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white">
      {selectedAdventure ? (
        <span>Select: {selectedAdventure.title}</span>
      ) : (
        <span>No adventure selected</span>
      )}
    </div>
  );
}
