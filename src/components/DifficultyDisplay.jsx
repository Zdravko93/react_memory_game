import classes from "./DifficultyDisplay.module.css";

export default function DifficultyDisplay({ difficulty }) {
  const diffClass = classes[difficulty.toLowerCase()];

  return (
    <div className={classes["difficulty-display"]}>
      <h3>Difficulty:</h3>
      <p className={diffClass}>
        <strong>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </strong>
      </p>
    </div>
  );
}
