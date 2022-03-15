import gameReducer, { flip, GameState } from "./gameSlice";

describe("game reducer", () => {
  const initialState: GameState = {
    status: "waiting",
    flippedCards: [],
    guessedCards: [],
  };

  it("should flip the card", () => {
    let actual = gameReducer(initialState, flip(["vscode-1"]));
    expect(actual.flippedCards.includes("vscode-1")).toBe(true);
    actual = gameReducer(actual, flip(["vscode-1"]));
    expect(actual.flippedCards.includes("vscode-1")).toBe(false);
  });

  it("should flip multiple cards", () => {
    const cardsIn = ["1", "2", "3"];
    const cardsNotIn = ["4", "5", "6"];

    let actual = gameReducer(initialState, flip(cardsIn));
    expect(actual.flippedCards).toEqual(cardsIn);
    actual = gameReducer(actual, flip([...cardsIn, ...cardsNotIn]));
    expect(actual.flippedCards).toEqual(cardsNotIn);
  });
});
