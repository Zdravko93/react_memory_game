import { useCallback } from "react";

import classes from "./DifficultySelector.module.css";
// Images
import childIcon from "../assets/child.webp";
import brainIcon from "../assets/brain.webp";
import skullIcon from "../assets/skull.webp";
import backButton from "../assets/back-btn.webp";
// Components
import DifficultyButton from "./DifficultyButton";
import Button from "./Button";

export default function DifficultySelector({
  onSelect,
  currentDifficulty,
  allowBack,
  onBackToGame,
}) {
  const handleEasy = useCallback(() => onSelect("easy"), [onSelect]);
  const handleMedium = useCallback(() => onSelect("medium"), [onSelect]);
  const handleHard = useCallback(() => onSelect("hard"), [onSelect]);

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
            onClick={handleEasy}
            isCurrent={currentDifficulty === "easy"}
          />

          <DifficultyButton
            btnClassName={classes.medium}
            iconSrc={brainIcon}
            altText="Brain icon representing medium game difficulty"
            label={'Normal Mode — "Let’s see what I’ve got"'}
            onClick={handleMedium}
            isCurrent={currentDifficulty === "medium"}
          />

          <DifficultyButton
            btnClassName={classes.hard}
            iconSrc={skullIcon}
            altText="Skull icon representing hard game difficulty"
            label={'Nightmare Mode — "Noo way 😵"'}
            onClick={handleHard}
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
