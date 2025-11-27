export function shuffleCards(images) {
  const paired = [...images, ...images];
  const shuffled = paired
    .map((img, i) => ({
      id: `${img}-${i}`,
      image: img,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
  return shuffled;
}

export function createLogEntry(turn, match) {
  return {
    id: `${turn}-${Date.now()}`, // unique id instead of 'index' as a key for future-proof code
    // avoids potential DOM bugs if entries are removed/edited later
    turn,
    time: new Date().toLocaleTimeString(),
    match,
  };
}

export function getMaxTurnsFromDifficulty(level) {
  switch (level) {
    case "easy":
      return 15;
    case "medium":
      return 10;
    case "hard":
      return 6;
    default:
      return 13;
  }
}

function getUnmatchedPairs(cards) {
  return cards.filter((card) => !card.matched).length / 2;
}

function hasNoChanceToWin(unmatchedPairs, remainingTurns) {
  return remainingTurns < unmatchedPairs;
}

export function evaluateGameOver(cards, turns, maxTurns) {
  const allCardsMatched = cards.every((card) => card.matched);
  const unmatchedPairs = getUnmatchedPairs(cards);
  const turnsRemaining = maxTurns - turns;

  const outOfTurns = turns >= maxTurns;
  const noChanceToWin = hasNoChanceToWin(unmatchedPairs, turnsRemaining);

  const shouldEnd = allCardsMatched || outOfTurns || noChanceToWin;

  const message = allCardsMatched
    ? `🎉 Congratulations! You won in ${turns} turns.`
    : noChanceToWin
    ? `❌ No more possible moves! You can't win this game anymore.`
    : `💀 You ran out of turns. Better luck next time!`;

  const feedbackType = allCardsMatched ? "success" : "failed";

  return { shouldEnd, message, type: feedbackType };
}
