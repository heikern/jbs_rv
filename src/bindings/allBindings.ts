import { setupGameBindings } from './playerBindings';
import roomStateBinding from '@/bindings/roomStateBindings';
import storyMetaDataBinding from '../bindings/storyMetaDataBinding';
import { updateRoomMetaData, updateRoomState } from '@/store/gameSlice';
import { Room } from 'colyseus.js';


export async function setUpAllBingings(room: Room<any>, dispatch: any){
    room.onStateChange.once(()=>{
        const plainMetadata = JSON.parse(JSON.stringify((room.state as any).storyMetadata));
        const currentHostToken = JSON.parse(JSON.stringify(room.state.currentHostToken));
        console.log("plainMetadata: ", plainMetadata);
        console.log("currentHostToken: ", currentHostToken);
        dispatch(updateRoomMetaData(plainMetadata));
        dispatch(updateRoomState({ hostPlayerToken: currentHostToken }));
        
    })
    setupGameBindings(room, dispatch);
    storyMetaDataBinding(room, dispatch);
    roomStateBinding(room, dispatch);
}
