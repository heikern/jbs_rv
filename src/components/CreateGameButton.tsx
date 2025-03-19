import { Button } from "./ui/button";
import { useRoomContext } from "@/contexts/RoomContext";

// Define props interface
interface CreateGameButtonProps {
  storyId: string; // Adjust type as needed
}

export const CreateGameButton: React.FC<CreateGameButtonProps> = ({ storyId }) => {
    const { createRoom, bindStoryMetadata } = useRoomContext();
    
    async function createGame() {
        const room = await createRoom("my_room", { storyId });
        // Wait for room to sync before binding metadata
        room.state.storyMetadata.onChange.once("sync", async () => {
            await bindStoryMetadata();
            console.log("room: ", room.state);
        });
    }
    
  return (
    <div>
      <Button variant={"outline"} onClick={createGame}>Create Game</Button>
    </div>
  );
}