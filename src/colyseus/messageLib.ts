

export const setServerPlayerName = (room: any, playerName: string) => {
  room.send("setColyPlayerName", {playerName: playerName})
}

export const setColyNumPlayers = (room: any, numPlayers: number) => {
  if (room){
    room.send("setColyNumPlayers", {numPlayers: numPlayers})
  }
}

export const setPlayerIsReady = (room: any, isReady: boolean) => {
  if (room){
    room.send("setPlayerIsReady", {isReady: isReady})
  }
}