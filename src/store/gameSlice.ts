import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface playerState {
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
    playerState: playerState; // new state field
  }

  const initialState: gameState = {
    hostSessionId: null,
    selectedStoryId: null,
    sessionId: null, // initial value
    roomId: null, // initial value
    numPlayers: null, // initial value
    storyTitle: null, // initial value
    playerState: {
      playerName: null,
      playerRole: null,
    },
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
      setPlayerName: (state, action: PayloadAction<string | null>) => {
        state.playerState.playerName = action.payload;
      },
    },
  })

export const { setSelectedStoryId, setNumPlayers, setRoomId, setSessionId, setPlayerName } = gameSlice.actions;
export default gameSlice.reducer;