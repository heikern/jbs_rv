import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface playerState {
    playerName: string | null;
    playerRole: string | null;
    isHost: boolean; // new state field
  }

interface gameState {
    selectedGameId: string | null;
    sessionId: string | null; // new state field
    roomId: string | null; // new state field
    numPlayers: number | null; // new state field
    storyTitle: string | null; // new state field
    playerState: playerState; // new state field
  }

  const initialState: gameState = {
    selectedGameId: null,
    sessionId: null, // initial value
    roomId: null, // initial value
    numPlayers: null, // initial value
    storyTitle: null, // initial value
    playerState: {
      playerName: null,
      playerRole: null,
      isHost: false, // new state field
    },
  };

  const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
      setSelectedGameId: (state, action: PayloadAction<string | null>) => {
        state.selectedGameId = action.payload;
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
      setIsHost: (state, action: PayloadAction<boolean>) => {
        state.playerState.isHost = action.payload;
      },
      setPlayerName: (state, action: PayloadAction<string | null>) => {
        state.playerState.playerName = action.payload;
      },
    },
  })

export const { setSelectedGameId, setNumPlayers, setRoomId, setSessionId, setIsHost, setPlayerName } = gameSlice.actions;
export default gameSlice.reducer;