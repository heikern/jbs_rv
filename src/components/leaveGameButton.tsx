import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRoom } from "@/contexts/RoomContext"
import { useRoomContext } from "@/contexts/RoomContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function LeaveGameButton() {
  const { leaveRoom } = useRoomContext()
  const navigate = useNavigate()
  const room = useRoom()
  const gameState = useSelector((state: any) => state.game.gameState);
  const allGameState = useSelector((state: any) => state.game);
  const handleLeave = async () => {
    if (room) {
       await leaveRoom()
    }
    console.log("allGaneState: ", allGameState)
    console.log("Game state after leaveRoom funct: ", gameState)
    // Your logic here (e.g., navigate, reset state, API call)
    console.log("Player left the game")
    navigate('/')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Leave Game</Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent className="bg-black text-white border border-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ll be removed from this game session and may lose your progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={handleLeave}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}