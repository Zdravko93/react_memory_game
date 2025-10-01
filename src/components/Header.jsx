import classes from "./Header.module.css";
import Button from "./Button";

export default function Header({ onStartGame, showStartbutton, label }) {
  return (
    <header className={classes.header}>
      <h1>{"React Memory Game"}</h1>
      <h2>{"Can you pair 'em all?"}</h2>
      <div className={classes["button-container"]}>
        {showStartbutton && <Button onClick={onStartGame}>{label}</Button>}
      </div>
    </header>
  );
}
