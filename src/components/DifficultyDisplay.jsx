import classes from "./DifficultyDisplay.module.css";

export default function DifficultyDisplay({ difficulty }) {
  // conditional class bases on difficulty level
  const diffClass = classes[difficulty.toLowerCase()];

  console.log("difficulty:", difficulty);
  console.log("diffClass:", diffClass);
  console.log("available classes:", classes);

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
