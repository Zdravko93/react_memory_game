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
  difficulty: "easy",
  turns: 0,
  maxTurns: 13,
  showDifficultySelector: false,
  gameStarted: false,
  gameOver: false,
  feedback: { message: "", type: "" },
  logEntries: [],
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "START_GAME": {
      const { difficulty } = action.payload || {};
      const maxTurns = getMaxTurnsFromDifficulty(difficulty || "easy");
      const shuffledCards = shuffleCards(cardImagePaths);

      return {
        ...initialState,
        cards: shuffledCards,
        maxTurns,
        difficulty: difficulty || "easy",
        gameStarted: true,
        showDifficultySelector: false, // reset on game start
      };
    }

    case "SHOW_DIFFICULTY_SELECTOR": {
      return {
        ...state,
        showDifficultySelector: true,
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
