import classes from "./DifficultyDisplay.module.css";

export default function DifficultyDisplay({ difficulty }) {
  const diffClass = classes[difficulty.toLowerCase()] || "";
  const difficultyText =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div
      className={classes["difficulty-display"]}
      aria-live="polite"
      role="status"
      aria-label="Current game difficulty"
    >
      <span>Difficulty:</span>
      <p className={diffClass}>
        <strong>{difficultyText}</strong>
      </p>
    </div>
  );
}
