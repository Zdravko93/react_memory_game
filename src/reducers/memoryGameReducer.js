import {
  shuffleCards,
  createLogEntry,
  getMaxTurnsFromDifficulty,
} from "../utils/gameHelpers";
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
      const shuffledCards = shuffleCards(cardImagePaths);

      if (preserveProgress) {
        // return preserved (latest) state snapshot too keep the game progress and continue the game after changing difficulty selection)
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
          showDifficultySelector: false, // reset on game start
        };
      }

      console.log("Reducer: START_GAME with", action.payload.difficulty);

      // RESET all state object properties
      return {
        ...initialState,
        cards: shuffledCards,
        maxTurns,
        difficulty: difficulty || "easy",
        gameStarted: true,
        showDifficultySelector: false, // reset on game start
        cameFromGame: false,
      };
    }

    case "SHOW_DIFFICULTY_SELECTOR_FROM_GAME": {
      return {
        ...state,
        showDifficultySelector: true,
        cameFromGame: true,
        gameStarted: false,
      };
    }

    case "CANCEL_DIFFICULTY_SELECTION": {
      return {
        ...state,
        showDifficultySelector: false,
        gameStarted: true,
        cameFromGame: false,
      };
    }

    case "RESTART_FLOW": {
      return {
        ...initialState,
        showDifficultySelector: true,
        cameFromGame: false,
      };
    }

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
      const [id1, id2] = state.flippedCards;
      const card1 = state.cards.find((c) => c.id === id1);
      const card2 = state.cards.find((c) => c.id === id2);

      const isMatch = card1.image === card2.image;
      const updatedCards = state.cards.map((card) => {
        if (isMatch && (card.id === id1 || card.id === id2)) {
          return { ...card, matched: true };
        }
        return card;
      });

      const logEntry = createLogEntry(state.turns + 1, isMatch);

      return {
        ...state,
        cards: isMatch
          ? updatedCards
          : updatedCards.map((card) =>
              card.id === id1 || card.id === id2
                ? { ...card, flipped: false }
                : card
            ),
        matchedCards: isMatch
          ? [...state.matchedCards, id1, id2]
          : state.matchedCards,
        flippedCards: [],
        turns: state.turns + 1,
        logEntries: [...state.logEntries, logEntry],
      };
    }

    case "SET_GAME_OVER": {
      return {
        ...state,
        gameOver: true,
        feedback: {
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    }

    default:
      return state;
  }
}
