import classes from "./GameLog.module.css";

function GameLog({ logEntries }) {
  return (
    <div className={classes["game-log"]}>
      <h3>Player's turns</h3>
      <div className={classes["log-entries"]}>
        {logEntries.map((entry, index) => (
          <div className={classes["log-entry"]} key={index}>
            <span className={classes.turn}>{`Turn ${entry.turn}`}</span>
            <span>{entry.time}</span>
            <span
              className={
                entry.result === "\u2713" ? classes.checkmark : classes.cross
              }
            >
              {entry.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameLog;
