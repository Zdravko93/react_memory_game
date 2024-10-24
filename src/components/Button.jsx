import classes from "./Button.module.css";

function Button({ children, onStartGame }) {
  return (
    <button onClick={onStartGame} className={classes.button}>
      {children}
    </button>
  );
}

export default Button;
