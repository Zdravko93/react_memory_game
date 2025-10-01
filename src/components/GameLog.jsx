import classes from "./GameLog.module.css";

export default function GameLog({ logEntries }) {
  return (
    <div className={classes["game-log"]}>
      <h3>{"Player's turns"}</h3>
      <div className={classes["log-entries"]}>
        {logEntries.map((entry, index) => (
          <div className={classes["log-entry"]} key={index}>
            <span className={classes.turn}>{`Turn ${entry.turn}`}</span>
            <span className={classes.time}>{entry.time}</span>
            <span className={entry.match ? classes.checkmark : classes.cross}>
              {entry.match ? "✓" : "✖"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
