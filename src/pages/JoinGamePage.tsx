import SingleStringForm from "@/components/SingleStringForm"
import TopBar from "@/components/TopBar"
import { useRoomContext } from "@/contexts/RoomContext"
import { getStateCallbacks } from "colyseus.js"
import { useDispatch } from "react-redux"
import { setSelectedStoryId } from "@/store/gameSlice"

const JoinGamePage = () => {
    const {joinRoomWithId} = useRoomContext()
    const dispatch = useDispatch()


    async function onSubmit (roomId: string): Promise<any>{
        const room = await joinRoomWithId(roomId)
        const $ = getStateCallbacks(room);
        $(room.state.storyMetadata).listen("Id", (newId: string, _: string) => {
                dispatch(setSelectedStoryId(newId));
              });

        $(room.state).players.onAdd((player, sessionId)=>{
                const updatedPlayerState = {
                  playerName: player.playerName,
                  playerRole: player.playerRole
                }
                const inputParams = {
                  updatedState: updatedPlayerState,
                  playerSessionId: sessionId
                }
                dispatch(updatePlayerState(inputParams));
                console.log("player added", updatedPlayerState, sessionId);
        
                $(player).onChange(()=>{
                  console.log("player changed", player.playerName);
                  const updatedPlayerState = {
                    playerName: player.playerName,
                    playerRole: player.playerRole
                  }
                  const inputParams = {
                    updatedState: updatedPlayerState,
                    playerSessionId: sessionId
                  }
                  console.log("inputParams", inputParams);
                  dispatch(updatePlayerState(inputParams));
                })
              })

        
        
    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
            <TopBar />
            <h1>Please enter room Id</h1>
            <SingleStringForm onSubmit={onSubmit} placeholder="Room Id" />
        </div>
    )
}

export default JoinGamePage