// gameBindings.ts
import { Room, getStateCallbacks } from "colyseus.js";
import { updatePlayerState,  removePlayerState} from "../store/gameSlice";

// You can refine the type of Room's state if available.
export function setupGameBindings(room: Room<any>, dispatch: any): void {
  
    const callbacks = getStateCallbacks(room);

    // Bind listener for players being added.
    callbacks(room.state).players.onAdd((player: any, sessionId: string) => {
      const updatedPlayerState = {
        playerName: player.playerName,
        playerRole: player.playerRole,
        isReady: player.isReady,
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
          isReady: player.isReady,
        };
        dispatch(updatePlayerState({
          updatedState: updatedPlayerState,
          playerSessionId: sessionId
        }));
      });
    });


    // Bind listener for players being removed.
    callbacks(room.state).players.onRemove((_: any, sessionId: string) => {
      // Remove the player from the store.
      console.log("player left: ", sessionId);
      dispatch(removePlayerState(sessionId))
    });

    // Check if room.state.players exists before iterating
    const players = room.state.players || {};
    Object.entries(players)
    .filter(([sessionId, _]) => {
        // Skip known internal keys
        return !["$items", "$indexes", "deletedItems"].includes(sessionId);
      })
    .forEach(([sessionId, player]) => {
            const typedPlayer = player as { playerName: string; playerRole: string; isReady: boolean };
            const updatedPlayerState = {
                playerName: typedPlayer.playerName,
                playerRole: typedPlayer.playerRole,
                isReady: typedPlayer.isReady,
            };
        dispatch(updatePlayerState({
            updatedState: updatedPlayerState,
            playerSessionId: sessionId
        }));
    });

}