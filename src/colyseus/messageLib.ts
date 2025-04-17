import { Room } from "colyseus.js";

export const setServerPlayerName = (room: any, playerToken:string, playerName: string) => {
  room.send("setColyPlayerName", {playerName: playerName, playerToken: playerToken})
}

export const setColyNumPlayers = (room: any, numPlayers: number) => {
  if (room){
    room.send("setColyNumPlayers", {numPlayers: numPlayers})
  }
}

export const setPlayerIsReady = (room: any, playerToken:string, isReady: boolean) => {
  if (room){
    room.send("setPlayerIsReady", {isReady: isReady, playerToken: playerToken})
  }
}

export const setRandomizeRoles = (room: any, playerToken: string) => {
  if (room){
    room.send("setRandomizeRoles", {playerToken: playerToken})
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

export const registerRoomMessageHandlers = (room: Room<any>) => {
  room.onMessage("token-assigned", (message) => {
    const { token } = message;
    console.log("Received token-assigned message:", message);
    if (token) {
      localStorage.setItem("playerToken", token);
      console.log("Received and stored playerToken:", token);
    }
  });

  // Add other message handlers here as needed
};