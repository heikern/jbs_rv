import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface playerState {
    playerSessionId: string | null;
    playerName: string | null;
    playerRole: string | null;
  }

interface gameState {
    hostSessionId: string | null; 
    selectedStoryId: string | null;
    sessionId: string | null; // new state field
    roomId: string | null; // new state field
    numPlayers: number | null; // new state field
    storyTitle: string | null; // new state field
    playerStateArray: playerState[]; // new state field
  }

  const initialState: gameState = {
    hostSessionId: null,
    selectedStoryId: null,
    sessionId: null, // initial value
    roomId: null, // initial value
    numPlayers: null, // initial value
    storyTitle: null, // initial value
    playerStateArray: [],
  };

  const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
      setSelectedStoryId: (state, action: PayloadAction<string | null>) => {
        state.selectedStoryId = action.payload;
      },
      setNumPlayers: (state, action: PayloadAction<number | null>) => {
        state.numPlayers = action.payload;
      },
      setRoomId: (state, action: PayloadAction<string | null>) => {
        state.roomId = action.payload;
      },
      setSessionId: (state, action: PayloadAction<string | null>) => {
        state.sessionId = action.payload;
      },
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
    },
  })

export const { setSelectedStoryId, setNumPlayers, setRoomId, setSessionId, updatePlayerState } = gameSlice.actions;
export default gameSlice.reducer;