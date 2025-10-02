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
