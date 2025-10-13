import classes from "./DifficultySelector.module.css";
import childIcon from "../assets/child.svg";
import brainIcon from "../assets/brain.svg";
import skullIcon from "../assets/skull.svg";
import backButton from "../assets/back-btn.svg";

import DifficultyButton from "./DifficultyButton";
import Button from "./Button";

export default function DifficultySelector({
  onSelect,
  currentDifficulty,
  allowBack,
  onBackToGame,
}) {
  return (
    <div className={classes["difficulty-main-container"]}>
      <div className={classes["difficulty-wrapper"]}>
        <div className={classes.difficulty}>
          <h2>
            <span role="img" aria-label="joystick">
              🕹️
            </span>{" "}
            Select Your Challenge
          </h2>

          <DifficultyButton
            btnClassName={classes.easy}
            iconSrc={childIcon}
            altText="Child icon representing easy game difficulty"
            label={'Child Mode — "I just want to win"'}
            onClick={() => onSelect("easy")}
            isCurrent={currentDifficulty === "easy"}
          />

          <DifficultyButton
            btnClassName={classes.medium}
            iconSrc={brainIcon}
            altText="Brain icon representing medium game difficulty"
            label={'Normal Mode — "Let’s see what I’ve got"'}
            onClick={() => onSelect("medium")}
            isCurrent={currentDifficulty === "medium"}
          />

          <DifficultyButton
            btnClassName={classes.hard}
            iconSrc={skullIcon}
            altText="Skull icon representing hard game difficulty"
            label={'Nightmare Mode — "Noo way 😵"'}
            onClick={() => onSelect("hard")}
            isCurrent={currentDifficulty === "hard"}
          />
        </div>
        {allowBack && (
          <div>
            <Button
              className={classes["difficulty-back-btn"]}
              onClick={onBackToGame}
              aria-label="Resume Game"
            >
              <img src={backButton} alt="" aria-hidden="true" />
              <span>Back to game</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
