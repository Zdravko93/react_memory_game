import classes from "./Header.module.css";
import Button from "./Button";

export default function Header({ onStartGame, showStartbutton, label }) {
  return (
    <header className={classes.header}>
      <h1>{"React Memory Game - Can you pair 'em all?"}</h1>
      <div className={classes["button-container"]}>
        {showStartbutton && <Button onClick={onStartGame}>{label}</Button>}
      </div>
    </header>
  );
}
