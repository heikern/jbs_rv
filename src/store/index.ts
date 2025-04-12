import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import firebaseReducer from './firebaseSlice';
import scriptReducer from './scriptSlice'; // Added scriptReducer

export const store = configureStore({
  reducer: {
    game: gameReducer,
    firebase: firebaseReducer,
    scripts: scriptReducer, // Added scriptReducer
  }
});

// Added default export
export default store;

// Optional exports for TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
