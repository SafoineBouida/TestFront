import gameReducer, {
  flip,
  setGameState,
  addGuessedCards,
  resetGame,
  GameState,
} from "./gameSlice";

describe("game reducer", () => {
  const initialState: GameState = {
    status: "waiting",
    flippedCards: [],
    guessedCards: [],
  };

  it("should flip the card", () => {
    const actual = gameReducer(initialState, flip("vscode-1"));
    expect(actual.flippedCards.includes("vscode-1"));
  });
});
