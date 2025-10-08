import classes from "./DifficultySelector.module.css";

export default function DifficultyButton({
  btnClassName,
  iconSrc,
  altText,
  label,
  onClick,
  isCurrent,
}) {
  return (
    <button className={btnClassName} onClick={onClick} disabled={isCurrent}>
      <img src={iconSrc} alt={altText} className={classes.icon} />
      <div>
        <span>{label}</span>
        {isCurrent && <span className={classes["current-badge"]}>Current</span>}
      </div>
    </button>
  );
}
