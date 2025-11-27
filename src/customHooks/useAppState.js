import { useReducer, useEffect, useCallback } from "react";
import { gameReducer, initialState } from "../reducers/memoryGameReducer";

export function useAppState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const showDifficultySelectorOnly = useCallback(() => {
    dispatch({ type: "SHOW_DIFFICULTY_SELECTOR_ONLY" });
  }, [dispatch]);

  const restartGame = useCallback(() => {
    dispatch({ type: "RESTART_FLOW" });
  }, [dispatch]);

  const startGame = useCallback(
    (difficulty = "easy", preserveProgress = false) => {
      dispatch({
        type: "START_GAME",
        payload: { difficulty, preserveProgress },
      });
    },
    [dispatch]
  );

  const flipCard = useCallback(
    (id) => {
      const canFlip =
        !state.gameOver && state.gameStarted && state.flippedCards.length < 2;

      if (!canFlip) return;

      dispatch({ type: "FLIP_CARD", payload: { id } });
    },
    [state.gameOver, state.gameStarted, state.flippedCards.length, dispatch]
  );

  // Flip evaluation logic
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timeout = setTimeout(() => {
        dispatch({ type: "EVALUATE_FLIPPED" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [state.flippedCards]);

  const turnsLeft = state.maxTurns - state.turns;

  return {
    state,
    startGame,
    flipCard,
    turnsLeft,
    restartGame,
    showDifficultySelectorOnly,
    dispatch,
  };
}
