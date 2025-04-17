import { useSelector, useDispatch} from "react-redux";
import {fetchPlayerScript} from "../store/scriptSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/store";
import ReactMarkdown from "react-markdown";
import { useRoom } from "@/contexts/RoomContext";

const PersonalStory = () => { 
    const selectedStoryId = useSelector((state: any) => state.game.storyMetadata.id);
    const dispatch = useDispatch<AppDispatch>();
    const room = useRoom();
    const sessionId = room?.sessionId;
    const playerStateArray = useSelector((state: any) => state.game.playerStateArray);
    const playerState = playerStateArray.find((player: any) => player.playerSessionId === sessionId);
    const playerScripts = useSelector((state: any) => state.scripts.playerScripts);
    const playerScript = playerState?.playerRoleId && playerScripts
      ? playerScripts[playerState.playerRoleId]
      : null;

    useEffect(()=>{
        if (selectedStoryId){
            console.log("selectedStoryId: ", selectedStoryId)
            console.log("playerState: ", playerState)
            console.log("playerScripts: ", playerScripts)
            const playerRoleId = playerState?.playerRoleId;
            if (playerRoleId){
                console.log("fetching player script for roleId: ", playerRoleId)
                dispatch(fetchPlayerScript({ storyId: selectedStoryId, playerRoleId:playerRoleId}))
            }
        }
    },[selectedStoryId, playerStateArray, playerScripts])


    return (
        <div className="prose prose-lg max-w-none px-5 py-6">
            {!playerScript ? (
                <p className="text-gray-500 italic">Loading...</p>
            ) : (
                <ReactMarkdown>{playerScript}</ReactMarkdown>
            )}
        </div>
    );
}

export default PersonalStory;