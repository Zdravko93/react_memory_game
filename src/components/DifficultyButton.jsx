import classes from "./DifficultySelector.module.css";

export default function DifficultyButton({
  btnClassName,
  iconSrc,
  altText,
  label,
  onClick,
}) {
  return (
    <button className={btnClassName} onClick={onClick}>
      <img src={iconSrc} alt={altText} className={classes.icon} />
      <span>{label}</span>
    </button>
  );
}
