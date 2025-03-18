// gameBindings.ts
import { Room, getStateCallbacks } from "colyseus.js";
import { updatePlayerState } from "../store/gameSlice";

// You can refine the type of Room's state if available.
export function setupGameBindings(room: Room<any>, dispatch: any): void {
  room.onStateChange.once(() => {
    const callbacks = getStateCallbacks(room);

    Object.entries(room.state.players)
    .filter(([sessionId, _]) => {
        // Skip known internal keys
        return !["$items", "$indexes", "deletedItems"].includes(sessionId);
      })
    .forEach(([sessionId, player]) => {
            const typedPlayer = player as { playerName: string; playerRole: string };
            const updatedPlayerState = {
                playerName: typedPlayer.playerName,
                playerRole: typedPlayer.playerRole,
            };
        dispatch(updatePlayerState({
            updatedState: updatedPlayerState,
            playerSessionId: sessionId
        }));
    });

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