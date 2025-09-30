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

  // Evaluate two flipped cards after short delay
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timeout = setTimeout(() => {
        dispatch({ type: "EVALUATE_FLIPPED" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [state.flippedCards]);

  // Check if game is over
  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return;

    const allMatched =
      state.cards.length && state.cards.every((card) => card.matched);
    const outOfTurns = state.turns >= 13;

    if (allMatched || outOfTurns) {
      dispatch({
        type: "SET_GAME_OVER",
        payload: {
          message: allMatched
            ? `Congratulations! You won in ${state.turns} turns.`
            : "You ran out of turns. Better luck next time!",
          type: allMatched ? "success" : "failed",
        },
      });
    }
  }, [state.cards, state.turns, state.gameStarted, state.gameOver]);

  return {
    state,
    startGame,
    flipCard,
  };
}
