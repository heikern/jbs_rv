import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface storyMetadata {
    id: string | null;
    title: string | null;
    description: string | null;
    numberOfPlayers: number | null;
}

interface playerState {
    playerSessionId: string | null;
    playerName: string | null;
    playerRole: string | null;
  }

interface gameState {
    hostSessionId: string | null; 
    sessionId: string | null; // new state field
    roomId: string | null; // new state field
    playerStateArray: playerState[]; // new state field
    storyMetadata: storyMetadata;
  }

  const initialState: gameState = {
    hostSessionId: null,
    sessionId: null, // initial value
    roomId: null, // initial value
    playerStateArray: [],
    storyMetadata: new Object() as storyMetadata,
  };

  const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
      updatePlayerState: (state, action: PayloadAction<any>) => {
        const {playerSessionId, updatedState} = action.payload;
        const playerIndex = state.playerStateArray.findIndex((player) => player.playerSessionId === playerSessionId);
        if (playerIndex === -1) {
          state.playerStateArray.push({
            playerSessionId: playerSessionId,
            playerName: updatedState.playerName,
            playerRole: updatedState.playerRole,
          })
        } else {
          state.playerStateArray[playerIndex] = {
            playerSessionId: playerSessionId,
            playerName: updatedState.playerName,
            playerRole: updatedState.playerRole,
          }
        }
        console.log(state.playerStateArray);
      },
      updateRoomMetaData : (state, action: PayloadAction<any>) => {
        const {Id, Title, Description, NumberOfPlayers} = action.payload;
        state.storyMetadata.id = Id;
        state.storyMetadata.description = Description;
        state.storyMetadata.title = Title;
        state.storyMetadata.numberOfPlayers = NumberOfPlayers;
      },
      removePlayerState: (state, action: PayloadAction<any>) => {
        state.playerStateArray = state.playerStateArray.filter(
          (player) => player.playerSessionId !== action.payload
        );
        console.log("Removed player session:", action.payload);
      },
    },
  })

export const { 
              //  setSelectedStoryId, 
              //  setNumPlayers, 
              //  setRoomId, 
              //  setSessionId, 
               updatePlayerState, 
               removePlayerState,
               updateRoomMetaData } = gameSlice.actions;
export default gameSlice.reducer;