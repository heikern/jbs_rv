import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import firebaseReducer from './firebaseSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    firebase: firebaseReducer,
  }
});

// Added default export
export default store;

// Optional exports for TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
