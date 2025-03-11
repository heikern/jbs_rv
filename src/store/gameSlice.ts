import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  data: any;
  selectedGameId: number | null;
  numPlayers: number | null; // new state field
}

const initialState: GameState = {
  data: null,
  selectedGameId: null,
  numPlayers: null, // initial value
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearGameState: (state) => {
      state.data = null;
    },
    setSelectedGameId: (state, action: PayloadAction<number | null>) => {
      state.selectedGameId = action.payload;
    },
    setNumPlayers: (state, action: PayloadAction<number | null>) => { // updated to accept null
      state.numPlayers = action.payload;
    }
  }
});

export const { setGameState, clearGameState, setSelectedGameId, setNumPlayers } = gameSlice.actions;
export default gameSlice.reducer;
