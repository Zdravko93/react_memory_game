import { v4 as uuidv4 } from "uuid";

import { shuffleCards, getMaxTurnsFromDifficulty } from "../utils/gameHelpers";
import { evaluateFlipped } from "../utils/evaluateFlipped";
import { cardImagePaths } from "../data/cardImages";

export const initialState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  difficulty: null,
  turns: 0,
  maxTurns: 13,
  showDifficultySelector: true,
  gameStarted: false,
  gameOver: false,
  feedback: { message: "", type: "" },
  logEntries: [],
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "START_GAME": {
      const { difficulty, preserveProgress = false } = action.payload || {};
      const maxTurns = getMaxTurnsFromDifficulty(difficulty || "easy");

      // Duplicate paths to create pairs
      const pairs = [...cardImagePaths, ...cardImagePaths];

      // Shuffle the array
      const shuffledPaths = shuffleCards(pairs);

      // Map paths into card objects
      const shuffledCards = shuffledPaths.map((path) => ({
        id: uuidv4(),
        image: path,
        flipped: false,
        matched: false,
      }));

      if (preserveProgress) {
        return {
          ...state,
          cards: shuffledCards,
          maxTurns,
          difficulty: difficulty || "easy",
          turns: 0,
          flippedCards: [],
          matchedCards: [],
          logEntries: [],
          gameOver: false,
          feedback: { message: "", type: "" },
          gameStarted: true,
          showDifficultySelector: false,
        };
      }

      return {
        ...initialState,
        cards: shuffledCards,
        maxTurns,
        difficulty: difficulty || "easy",
        gameStarted: true,
        showDifficultySelector: false,
        cameFromGame: false,
      };
    }

    case "SHOW_DIFFICULTY_SELECTOR_FROM_GAME":
      return {
        ...state,
        showDifficultySelector: true,
        cameFromGame: true,
        gameStarted: false,
      };

    case "CANCEL_DIFFICULTY_SELECTION":
      return {
        ...state,
        showDifficultySelector: false,
        gameStarted: true,
        cameFromGame: false,
      };

    case "RESTART_FLOW":
      return {
        ...initialState,
        showDifficultySelector: true,
        cameFromGame: false,
      };

    case "FLIP_CARD": {
      const { id } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (
        !card ||
        card.flipped ||
        card.matched ||
        state.flippedCards.includes(id)
      ) {
        return state;
      }

      const flippedCards = [...state.flippedCards, id];
      const cards = state.cards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      );

      return { ...state, flippedCards, cards };
    }

    case "EVALUATE_FLIPPED": {
      return evaluateFlipped(state);
    }

    default:
      return state;
  }
}
