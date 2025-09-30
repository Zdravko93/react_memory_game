import classes from "./Header.module.css";
import Button from "./Button";

export default function Header({ onStartGame }) {
  return (
    <header className={classes.header}>
      <h1>{"React Memory Game - Can you pair 'em all?"}</h1>
      <Button onClick={onStartGame}>Start game</Button>
    </header>
  );
}
