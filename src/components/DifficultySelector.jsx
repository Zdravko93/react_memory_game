import classes from "./DifficultySelector.module.css";
import childIcon from "../assets/child.svg";
import brainIcon from "../assets/brain.svg";
import skullIcon from "../assets/skull.svg";

import DifficultyButton from "./DifficultyButton";

export default function DifficultySelector({ onSelect }) {
  return (
    <div className={classes["difficulty-wrapper"]}>
      <div className={classes.difficulty}>
        <h3>🕹️ Select Your Challenge</h3>

        <DifficultyButton
          btnClassName={classes.easy}
          iconSrc={childIcon}
          altText="Child icon representing easy game difficulty"
          label={'Child Mode — "I just want to win"'}
          onClick={() => onSelect("easy")}
        />

        <DifficultyButton
          btnClassName={classes.medium}
          iconSrc={brainIcon}
          altText="Brain icon representing medium game difficulty"
          label={'Normal Mode — "Let’s see what I’ve got"'}
          onClick={() => onSelect("medium")}
        />

        <DifficultyButton
          btnClassName={classes.hard}
          iconSrc={skullIcon}
          altText="Skull icon representing hard game difficulty"
          label={'Hardcore Mode — "Test my luck 😵"'}
          onClick={() => onSelect("hard")}
        />
      </div>
    </div>
  );
}
