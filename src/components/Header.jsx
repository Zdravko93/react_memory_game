import classes from "./Header.module.css";

export default function Header({ showTurns, turnsLeft }) {
  return (
    <header className={classes.header} aria-label="Game status header">
      <h1>{"React Memory Game"}</h1>
      <h2>{"Can you pair 'em all?"}</h2>

      {showTurns && (
        <p className={classes["turns-left"]}>
          {turnsLeft > 1 ? (
            <>
              Turns left:{" "}
              <span
                className={
                  turnsLeft > 3
                    ? classes["turns-left-number"]
                    : `${classes["turns-left-number"]} ${classes["number-alert"]}`
                }
              >
                {turnsLeft}
              </span>
            </>
          ) : (
            turnsLeft === 1 && (
              <>
                <span aria-hidden="true">⚠️</span>
                <span className="sr-only">Warning: </span>
                Final turn!
              </>
            )
          )}
        </p>
      )}
    </header>
  );
}
