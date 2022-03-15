import React, { useEffect, useState } from "react";
import Card from "components/Card";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { randomizeArray } from "utils";
import Timer from "components/Timer";
import Dialog from "components/Dialog";
import {
  flip,
  selectFlippedCards,
  setGameState,
  selectGameStatus,
  addGuessedCards,
  selectGuessedCards,
  resetGame,
} from "./gameSlice";
import { data } from "./data";
import styles from "./game.module.css";

const Game = () => {
  const [gameData, setGameData] = useState(data);
  const [gameDialogOpen, setGameDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const flippedCards = useAppSelector(selectFlippedCards);
  const gameStatus = useAppSelector(selectGameStatus);
  const guessedCards = useAppSelector(selectGuessedCards);

  const onCardClick = (id: string) => () => {
    dispatch(flip([id]));
  };

  useEffect(() => {
    setGameData(randomizeArray(data));
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      dispatch(setGameState("loading"));
      if (!flippedCards[0].startsWith(flippedCards[1].slice(0, -1))) {
        setTimeout(() => {
          dispatch(flip(flippedCards));
          dispatch(setGameState("waiting"));
        }, 1000);
      } else {
        dispatch(addGuessedCards(flippedCards));
        dispatch(flip(flippedCards));
        dispatch(setGameState("waiting"));
      }
    }
  }, [flippedCards.length]);

  useEffect(() => {
    if (guessedCards.length === 16) {
      setTimeout(() => {
        onGameFinished();
      }, 1000);
    }
  }, [guessedCards.length]);

  const onGameFinished = () => {
    dispatch(setGameState("finished"));
    setGameDialogOpen(true);
  };

  const restartGame = () => {
    dispatch(resetGame());
    setGameData(randomizeArray(data));
    setGameDialogOpen(false);
  };

  return (
    <body className={styles.body}>
      <div className={styles.div}>
        <div className={styles.cards}>
          {Array(16)
            .fill(0)
            .map((r, index) => {
              const { logo, id } = gameData[index];
              return (
                <div key={id}>
                  <Card
                    image={logo}
                    isClickDisabled={
                      gameStatus === "finished" ||
                      gameStatus === "loading" ||
                      guessedCards.includes(id) ||
                      flippedCards.includes(id)
                    }
                    flipped={
                      flippedCards.includes(id) || guessedCards.includes(id)
                    }
                    onClick={onCardClick(id)}
                    key={id}
                  />
                </div>
              );
            })}
        </div>
        <div className={styles.timer}>
          <Timer
            inProgress={gameStatus !== "finished"}
            onFinished={onGameFinished}
          />
        </div>
        <Dialog
          won={guessedCards.length === 16}
          onClose={restartGame}
          open={gameDialogOpen}
        />
      </div>
    </body>
  );
};

export default Game;
