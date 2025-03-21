// gameBindings.ts
import { Room, getStateCallbacks } from "colyseus.js";
import { updatePlayerState, removePlayerState } from "../store/gameSlice";

// You can refine the type of Room's state if available.
export function setupGameBindings(room: Room<any>, dispatch: any): void {
  
    const callbacks = getStateCallbacks(room);

    // Bind listener for players being added.
    callbacks(room.state).players.onAdd((player: any, sessionId: string) => {
      const updatedPlayerState = {
        playerName: player.playerName,
        playerRole: player.playerRole,
      };

      dispatch(updatePlayerState({
        updatedState: updatedPlayerState,
        playerSessionId: sessionId
      }));

      // Listen for changes in the player object.
      callbacks(player).onChange(() => {
        const updatedPlayerState = {
          playerName: player.playerName,
          playerRole: player.playerRole,
        };
        dispatch(updatePlayerState({
          updatedState: updatedPlayerState,
          playerSessionId: sessionId
        }));
      });
    });
  });
}