import { useReducer, useEffect } from "react";
import { gameReducer, initialState } from "../reducers/memoryGameReducer";

export function useAppState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = () => dispatch({ type: "START_GAME" });

  const flipCard = (id) => {
    if (state.gameOver || !state.gameStarted || state.flippedCards.length >= 2)
      return;
    dispatch({ type: "FLIP_CARD", payload: { id } });
  };

  // Flip evaluation logic
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timeout = setTimeout(() => {
        dispatch({ type: "EVALUATE_FLIPPED" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [state.flippedCards]);

  // Game Over check
  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return;

    const allMatched =
      state.cards.length && state.cards.every((card) => card.matched);
    const outOfTurns = state.turns >= state.maxTurns;

    if (allMatched || outOfTurns) {
      dispatch({
        type: "SET_GAME_OVER",
        payload: {
          message: allMatched
            ? `Congratulations! You won in ${state.maxTurns} turns.`
            : "You ran out of turns. Better luck next time!",
          type: allMatched ? "success" : "failed",
        },
      });
    }
  }, [
    state.cards,
    state.turns,
    state.maxTurns,
    state.gameStarted,
    state.gameOver,
  ]);

  const turnsLeft = state.maxTurns - state.turns;

  return {
    state,
    startGame,
    flipCard,
    turnsLeft,
  };
}
