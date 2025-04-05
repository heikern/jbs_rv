import { Room, getStateCallbacks } from "colyseus.js";
import { updateRoomState } from "@/store/gameSlice";

async function roomStateBinding(room: Room<any>, dispatch: any) {
    const callbacks = await getStateCallbacks(room);

    callbacks(room.state).listen("currentHost", (currentValue, previousValue) => {
        console.log(`Host is now ${currentValue}, was ${previousValue}`);
        dispatch(updateRoomState({ hostSessionId: currentValue }));
    });

    callbacks(room.state).listen("gameState", (currentValue, previousValue) => {
        console.log(`Game state is now ${currentValue}, was ${previousValue}`);
        dispatch(updateRoomState({ gameState: currentValue }));
    });
}

export default roomStateBinding;