import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStateEnum } from "@/types/gameStates";

interface storyMetadata {
    id: string | null;
    title: string | null;
    description: string | null;
    numberOfPlayers: number | null;
}

export interface playerState {
    playerToken: string | null;
    playerSessionId: string | null;
    playerName: string | null;
    playerRoleId: string | null;
    isReady: boolean;
  }

interface gameState {
    hostPlayerToken: string | null; 
    gameState: GameStateEnum; // new state field
    playerStateArray: playerState[]; // new state field
    storyMetadata: storyMetadata;
  }

// Create a function for a fresh initial state each time
const getInitialState = (): gameState => ({
  hostPlayerToken: null,
  gameState: GameStateEnum.default,
  playerStateArray: [],
  storyMetadata: {
    id: null,
    title: null,
    description: null,
    numberOfPlayers: null,
  },
});

const initialState: gameState = getInitialState();

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateRoomState: (state, action: PayloadAction<any>) => {
      if ("currentHostToken" in action.payload) {
        state.hostPlayerToken = action.payload.currentHostToken;
      }

      if ("gameState" in action.payload) {
        state.gameState = action.payload.gameState;
      }

    },
    updatePlayerState: (state, action: PayloadAction<any>) => {
      const {playerToken, updatedState} = action.payload;
      const playerIndex = state.playerStateArray.findIndex((player) => player.playerToken === playerToken);
      if (playerIndex === -1) {
        state.playerStateArray.push({
          playerToken: playerToken,
          playerSessionId: updatedState.playerSessionId,
          playerName: updatedState.playerName,
          playerRoleId: updatedState.playerRoleId,
          isReady: updatedState.isReady,
        })
      } else {
        state.playerStateArray[playerIndex] = {
          playerToken: playerToken,
          playerSessionId: updatedState.playerSessionId,
          playerName: updatedState.playerName,
          playerRoleId: updatedState.playerRoleId,
          isReady: updatedState.isReady,
        }
      }
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
        (player) => player.playerToken !== action.payload
      );
      console.log("Removed player session:", action.payload);
    },
    resetGameState: (state) => {
      console.log("Game state reset", state);
      return getInitialState();
    }
  },
})

export const { 
                updateRoomState,
                updatePlayerState, 
                removePlayerState,
                updateRoomMetaData,
                resetGameState
               } = gameSlice.actions;
export default gameSlice.reducer;