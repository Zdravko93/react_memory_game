import { createLogEntry } from "./gameHelpers";

export function evaluateFlipped(state) {
  const [id1, id2] = state.flippedCards;
  const card1 = state.cards.find((c) => c.id === id1);
  const card2 = state.cards.find((c) => c.id === id2);

  const isMatch = card1.image === card2.image;
  const turns = state.turns + 1;

  let cards = state.cards.map((card) => {
    if (isMatch && (card.id === id1 || card.id === id2)) {
      return { ...card, matched: true };
    }
    return card;
  });

  if (!isMatch) {
    cards = cards.map((card) =>
      card.id === id1 || card.id === id2 ? { ...card, flipped: false } : card
    );
  }

  const unmatchedPairs = cards.filter((c) => !c.matched).length / 2;
  const turnsRemaining = state.maxTurns - turns;

  const outOfTurns = turns >= state.maxTurns;
  const noChanceToWin = turnsRemaining < unmatchedPairs;
  const allMatched = cards.every((card) => card.matched);

  const gameOver = outOfTurns || noChanceToWin || allMatched;

  const feedback = gameOver
    ? allMatched
      ? {
          message: `🎉 Congratulations! You won in ${turns} turns.`,
          type: "success",
        }
      : noChanceToWin
      ? {
          message:
            "❌ No more possible moves! You can't win this game anymore.",
          type: "failed",
        }
      : {
          message: "💀 You ran out of turns. Better luck next time!",
          type: "failed",
        }
    : state.feedback;

  return {
    ...state,
    cards,
    turns,
    flippedCards: [],
    matchedCards: isMatch
      ? [...state.matchedCards, id1, id2]
      : state.matchedCards,
    logEntries: [...state.logEntries, createLogEntry(turns, isMatch)],
    gameOver,
    feedback,
  };
}
