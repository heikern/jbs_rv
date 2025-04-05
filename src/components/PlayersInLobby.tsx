import React from "react";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRoom } from "@/contexts/RoomContext";

type PlayersInLobbyProps = {
    players: { playerName: string; 
               playerRole: string;
               playerSessionId: string;
               isReady: boolean; }[];
};

const readyClass = (isReady: boolean) => {
    return clsx( "text-xs", {
        "text-green-600": isReady,
        "text-yellow-600": !isReady,
    });
}

const PlayersInLobby: React.FC<PlayersInLobbyProps> = ({ players }) => {
    const room = useRoom();
    return (
        <ScrollArea className="h-auto w-full rounded-lg">
            <table className="w-full">
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 text-xs text-white">
                                {player.playerName} {room?.sessionId === player.playerSessionId ? "(you)" : ""}
                            </td>
                            {room?.state.currentHost === player.playerSessionId ?
                            <td className="text-xs text-green-600">Host</td> : 
                            <td className={readyClass(player.isReady)}>{player.isReady ? "Ready" : "Not Ready"}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ScrollArea>
    );
};

export default PlayersInLobby;