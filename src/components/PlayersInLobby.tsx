import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type PlayersInLobbyProps = {
    players: { playerName: string; playerRole: string }[];
};

const PlayersInLobby: React.FC<PlayersInLobbyProps> = ({ players }) => {
    return (
        <ScrollArea className="h-auto w-full rounded-lg">
            {players.map((player, index) => (
                <p key={index} data-testid="player-name">{player.playerName}</p>
            ))}
        </ScrollArea>
    );
};

export default PlayersInLobby;