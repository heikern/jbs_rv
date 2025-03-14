import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appState {
  data: any;
  selectedGameId: string | null;
  roomId: string | null; // new state field
  isHost: boolean; // new state field
  numPlayers: number | null; // new state field

}

const initialState: appState = {
  data: null,
  selectedGameId: null,
  isHost: false, // initial value
  roomId: null, // initial value
  numPlayers: null, // initial value
};

const appSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    appState: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearGameState: (state) => {
      state.data = null;
    },
    setSelectedGameId: (state, action: PayloadAction<string | null>) => {
      state.selectedGameId = action.payload;
    },
    setNumPlayers: (state, action: PayloadAction<number | null>) => { // updated to accept null
      state.numPlayers = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string | null>) => { // new reducer
      state.roomId = action.payload
    }
  }
});

export const { setGameState, clearGameState, setSelectedGameId, setNumPlayers } = appSlice.actions;
export default appSlice.reducer;
