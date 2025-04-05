

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

export const setRandomizeRoles = (room: any) => {
  if (room){
    room.send("setRandomizeRoles")
  }
}

export const setPlayerRole = (room: any, options: any) => {
  if (room){
    room.send("setPlayerRole", options)
  }
}

export const setEnterLobby = (room: any) => {
  if (room){
    room.send("setEnterLobby")
  }
}

export const setStartGame = (room: any) => {
  if (room){
    room.send("setStartGame")
  }
}