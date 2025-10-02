import ReactDOM from "react-dom";
import classes from "./GameOver.module.css";

const Backdrop = ({ onClick }) => (
  <div className={classes.backdrop} onClick={onClick} />
);

const Modal = ({ feedbackText, feedbackColor, onRestart }) => (
  <div
    className={classes.modal}
    role="dialog"
    aria-modal="true"
    aria-labelledby="gameOverTitle"
  >
    <h2 id="gameOverTitle">Game Over!</h2>
    <p className={classes[feedbackColor]}>{feedbackText}</p>
    <p className={classes.actions}>
      <button onClick={onRestart}>Restart game</button>
    </p>
  </div>
);

export default function GameOver({ feedbackText, feedbackColor, onRestart }) {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onRestart} />
      <Modal
        feedbackText={feedbackText}
        feedbackColor={feedbackColor}
        onRestart={onRestart}
      />
    </>,
    modalRoot
  );
}
