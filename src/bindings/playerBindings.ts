// gameBindings.ts
import { Room, getStateCallbacks } from "colyseus.js";
import { updatePlayerState,  removePlayerState} from "../store/gameSlice";
import { MapSchema } from "@colyseus/schema";

// You can refine the type of Room's state if available.
export function setupGameBindings(room: Room<any>, dispatch: any): void {
  
    const callbacks = getStateCallbacks(room);

    console.log("Initial room.state:", room.state);

    // Ensure playersByToken exists before binding listeners
    if (!room.state.playersByToken || !(room.state.playersByToken instanceof MapSchema)) {
        console.warn("playersByToken is not initialized yet. Waiting for state update...");
        
        room.onStateChange.once((state) => {
            if (state.playersByToken && state.playersByToken instanceof MapSchema) {
              console.log("playersByToken initialized after await.");
              setupGameBindings(room, dispatch); // Reinitialize bindings
            }
        });
        return;
    }

    console.log("playersByToken is initialized and ready.");

    // Bind listener for players being added.
    callbacks(room.state).playersByToken.onAdd((player: any, playerToken: string) => {
      const updatedPlayerState = {
        playerSessionId: player.sessionId,
        playerName: player.playerName,
        playerRoleId: player.playerRoleId,
        isReady: player.isReady,
      };

      dispatch(updatePlayerState({
        updatedState: updatedPlayerState,
        playerToken: playerToken
      }));

      // Listen for changes in the player object.
      callbacks(player).onChange(() => {
        const updatedPlayerState = {
          playerSessionId: player.sessionId,
          playerName: player.playerName,
          playerRoleId: player.playerRoleId,
          isReady: player.isReady,
        };
        dispatch(updatePlayerState({
          updatedState: updatedPlayerState,
          playerToken: playerToken
        }));
      });
    });


    // Bind listener for players being removed.
    callbacks(room.state).playersByToken.onRemove((_: any, playerToken: string) => {
      // Remove the player from the store.
      console.log("player left: ", playerToken);
      dispatch(removePlayerState(playerToken))
    });

    // Check if room.state.players exists before iterating
    const players = room.state.playersByToken || {};
    
    Object.entries(players)
    .filter(([playerToken, _]) => {
        // Skip known internal keys
        return !["$items", "$indexes", "deletedItems"].includes(playerToken);
      })
    .forEach(([playerToken, player]) => {
            const typedPlayer = player as { 
                                            playerSessionId: string;
                                            playerName: string; 
                                            playerRoleId: string; 
                                            isReady: boolean;  };
            const updatedPlayerState = {
                playerSessionId: typedPlayer.playerSessionId,
                playerName: typedPlayer.playerName,
                playerRoleId: typedPlayer.playerRoleId,
                isReady: typedPlayer.isReady,
            };
        dispatch(updatePlayerState({
            updatedState: updatedPlayerState,
            playerToken: playerToken
        }));
    });

}