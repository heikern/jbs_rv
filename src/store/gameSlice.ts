import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  data: any;
  selectedGameId: number | null;
}

const initialState: GameState = {
  data: null,
  selectedGameId: null,
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
    }
  }
});

export const { setGameState, clearGameState, setSelectedGameId } = gameSlice.actions;
export default gameSlice.reducer;
