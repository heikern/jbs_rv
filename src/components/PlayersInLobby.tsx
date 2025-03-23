import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRoom } from "@/contexts/RoomContext";

type PlayersInLobbyProps = {
    players: { playerName: string; 
               playerRole: string;
               playerSessionId: string; }[];
};

const PlayersInLobby: React.FC<PlayersInLobbyProps> = ({ players }) => {
    const room = useRoom();
    return (
        <ScrollArea className="h-auto w-full rounded-lg">
            {players.map((player, index) => (
                <p key={index} data-testid="player-name">{player.playerName} {room?.sessionId === player.playerSessionId? '(you)': ''}</p>
            ))}
        </ScrollArea>
    );
};

export default PlayersInLobby;