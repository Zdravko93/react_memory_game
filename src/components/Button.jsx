import classes from "./Button.module.css";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
}
