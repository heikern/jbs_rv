import { useSelector, useDispatch} from "react-redux";
import {fetchCommonScript} from "../store/scriptSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/store";
import ReactMarkdown from "react-markdown";

const Scene = () => { 
    const selectedStoryId = useSelector((state: any) => state.game.storyMetadata.id);
    const dispatch = useDispatch<AppDispatch>();
    const commonScript = useSelector((state: any) => state.scripts.commonScript);

    useEffect(()=>{
        if (selectedStoryId){
            console.log("selectedStoryId: ", selectedStoryId)
            dispatch(fetchCommonScript({ storyId: selectedStoryId }))
        }
    },[selectedStoryId, dispatch])


    return (
        <div className="prose prose-lg max-w-none px-5 py-6">
            {!commonScript ? (
                <p className="text-gray-500 italic">Loading...</p>
            ) : (
                <ReactMarkdown>{commonScript}</ReactMarkdown>
            )}
        </div>
    );
}

export default Scene;