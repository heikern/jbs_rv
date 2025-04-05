import { useEffect, useState } from "react";
import { Room, getStateCallbacks } from "colyseus.js";
import { ColyseusGameState, Player } from "../types/colyseusSchema"; // adjust the path accordingly

export function usePlayerData(room: Room<ColyseusGameState> | null): Player[] {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!room) return;
    const $ = getStateCallbacks(room);

    // Listen for players being added to the map
    const offAdd = $(room.state).players.onAdd((player: Player, _: string) => {
      // Optionally, if you want to ensure the player object has the sessionId,
      // you can set it here if not already present:
      // player.id = sessionId;
      setPlayers((prev) => [...prev, player]);

      // Listen for changes on that player instance
      $(player).onChange(() => {
        setPlayers((prev) =>
          prev.map((p) => (p.id === player.id ? player : p))
        );
      });
    });

    // Cleanup the onAdd subscription when the component unmounts or room changes.
    return () => {
      offAdd();
    };
  }, [room]);

  return players;
}