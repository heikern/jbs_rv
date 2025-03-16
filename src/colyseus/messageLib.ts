import { Room } from "colyseus.js"; 


export const setServerPlayerName = (room: Room<any>, playerName: string) => {
  room.send("setColyPlayerName", {playerName: playerName})
}