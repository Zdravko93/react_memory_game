import classes from "./GameOver.module.css";

function GameOver({ feedbackText, feedbackColor, onRestart }) {
  return (
    <div className={`${classes.modal}`}>
      <h2>Game Over!</h2>
      <p className={classes[feedbackColor]}>{feedbackText}</p>
      <p className={classes.actions}>
        <button onClick={onRestart}>Restart game</button>
      </p>
    </div>
  );
}

export default GameOver;
