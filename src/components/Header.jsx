import classes from "./Header.module.css";
import Button from "./Button";

function Header({ onStartGame }) {
  return (
    <header className={classes.header}>
      <h1>React Memory Game - Can you pair 'em all?</h1>
      <Button onStartGame={onStartGame}>Start game</Button>
    </header>
  );
}

export default Header;
