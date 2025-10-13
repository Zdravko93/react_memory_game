import React from "react";

import classes from "./DifficultySelector.module.css";

import Button from "./Button";

const DifficultyButton = React.memo(function DifficultyButton({
  btnClassName,
  iconSrc,
  altText,
  label,
  onClick,
  isCurrent,
}) {
  return (
    <Button
      className={btnClassName}
      onClick={onClick}
      disabled={isCurrent}
      aria-label={`${label}${isCurrent ? ", currently selected" : ""}`}
    >
      <img src={iconSrc} alt={altText} className={classes.icon} />
      <div>
        <span>{label}</span>
        {isCurrent && (
          <span className={classes["current-badge"]} aria-hidden="true">
            Current
          </span>
        )}
      </div>
    </Button>
  );
});

export default DifficultyButton;
