import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

type GameStatus = "finished" | "loading" | "waiting";

export interface GameState {
  status: GameStatus;
  flippedCards: string[];
  guessedCards: string[];
}

const initialState: GameState = {
  status: "waiting",
  flippedCards: [],
  guessedCards: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    flip: (state, action: PayloadAction<string>) => {
      if (!state.flippedCards.includes(action.payload)) {
        state.flippedCards.push(action.payload);
      } else {
        state.flippedCards = state.flippedCards.filter(
          (id) => id != action.payload
        );
      }
    },
    setGameState: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    addGuessedCards: (state, action: PayloadAction<string>) => {
      state.guessedCards.push(action.payload);
    },
    resetGame: (state) => initialState,
  },
});

export const { flip, setGameState, addGuessedCards, resetGame } =
  gameSlice.actions;

export const selectFlippedCards = (state: RootState) => state.game.flippedCards;
export const selectGuessedCards = (state: RootState) => state.game.guessedCards;
export const selectGameStatus = (state: RootState) => state.game.status;

export default gameSlice.reducer;
