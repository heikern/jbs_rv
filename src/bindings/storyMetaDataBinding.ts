import { Room, getStateCallbacks } from "colyseus.js"
import {updateRoomMetaData} from "../store/gameSlice"


async function storyMetaDataBinding(room: Room<any>, dispatch: any){
    const callbacks = await getStateCallbacks(room)

    callbacks(room.state.storyMetadata).onChange(()=>{
        console.log("Story Metadata Changed")
        const plainMetadata = JSON.parse(JSON.stringify(room.state.storyMetadata));
        dispatch(updateRoomMetaData(plainMetadata))
    })

    
}

export default storyMetaDataBinding