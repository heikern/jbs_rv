import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ColyseusPlayer {
  playerName: string;
  roleIndex: string; // set roleIndex as string
  isReady: boolean;
}

export interface ColyseusGameState {
  players: { [sessionId: string]: ColyseusPlayer };
  roomOwnerId: string; // changed from string | null to string
  storyId: string;     // changed from string | null to string
}

export interface ColyseusState {
  connected: boolean;
  gameState: ColyseusGameState | null;
  error: string | null;
}

const initialState: ColyseusState = {
  connected: false,
  gameState: {
    players: {},
    roomOwnerId: "", // use empty string default
    storyId: "",     // use empty string default
  },
  error: null,
};

const colyseusSlice = createSlice({
  name: 'colyseus',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    updateGameState: (state, action: PayloadAction<ColyseusGameState>) => {
      state.gameState = action.payload;
    },
    setRoomOwnerId: (state, action: PayloadAction<string>) => {
      if (state.gameState) {
        state.gameState.roomOwnerId = action.payload;
      }
    },
    setStoryId: (state, action: PayloadAction<string>) => {
      if (state.gameState) {
        state.gameState.storyId = action.payload;
      }
    },
    setPlayerName: (state, action: PayloadAction<{ sessionId: string; playerName: string }>) => {
      if (state.gameState) {
        state.gameState.players[action.payload.sessionId] = {
          ...(state.gameState.players[action.payload.sessionId] || { playerName: '', roleIndex: "", isReady: false }),
          playerName: action.payload.playerName,
        };
      }
    },
    setPlayerRoleIndex: (state, action: PayloadAction<{ sessionId: string; roleIndex: string }>) => {
      if (state.gameState && state.gameState.players[action.payload.sessionId]) {
        state.gameState.players[action.payload.sessionId].roleIndex = action.payload.roleIndex;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearColyseus: (state) => {
      state.connected = false;
      state.gameState = initialState.gameState;
      state.error = null;
    },
  },
});

export const { setConnected, updateGameState, setRoomOwnerId, setStoryId, setPlayerName, setPlayerRoleIndex, setError, clearColyseus } = colyseusSlice.actions;
export default colyseusSlice.reducer;
