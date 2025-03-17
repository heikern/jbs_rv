import { Room } from "colyseus.js"
import { useEffect } from "react"
import { getStateCallbacks } from "colyseus.js"
import { useDispatch } from "react-redux"
import { setSelectedStoryId } from "@/store/gameSlice"
import { updatePlayerState } from "@/store/gameSlice"


export const useGameStateBinding = (room: Room<any> | null) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!room) return;

        room.onStateChange.once((_: any) => {
            const $ = getStateCallbacks(room);
            $(room.state.storyMetadata).listen("Id", (newId: string, _: string) => {
                dispatch(setSelectedStoryId(newId));
            });

            $(room.state.players).onAdd((player, sessionId) => {
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

                $(player).onChange(() => {
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
                });
            });


        });

    }, [room, dispatch])
} 