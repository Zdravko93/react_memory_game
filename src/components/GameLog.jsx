import classes from "./GameLog.module.css";

export default function GameLog({ logEntries }) {
  return (
    <section className={classes["game-log"]} aria-label="Player turns log">
      <h2>{"Player's turns"}</h2>
      <ul className={classes["log-entries"]} aria-label="">
        {logEntries.map((entry, index) => (
          <li className={classes["log-entry"]} key={index}>
            <span className={classes.turn}>{`Turn ${entry.turn}`}</span>
            <span className={classes.time}>{entry.time}</span>
            <span
              className={entry.match ? classes.checkmark : classes.cross}
              aria-label={entry.match ? "Match found" : "No match"}
              role="img"
            >
              {entry.match ? "✓" : "✖"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
