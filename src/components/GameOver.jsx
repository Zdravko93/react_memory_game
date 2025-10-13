import ReactDOM from "react-dom";
import classes from "./GameOver.module.css";

const Backdrop = () => <div className={classes.backdrop} aria-hidden="true" />;

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
      <button type="button" onClick={onRestart}>
        Restart game
      </button>
    </p>
  </div>
);

export default function GameOver({ feedbackText, feedbackColor, onRestart }) {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <>
      <Backdrop />
      <Modal
        feedbackText={feedbackText}
        feedbackColor={feedbackColor}
        onRestart={onRestart}
      />
    </>,
    modalRoot
  );
}
