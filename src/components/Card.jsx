import classes from "./Card.module.css";

export default function Card({
  cardImage,
  coverImage,
  id,
  flipped,
  matched,
  onClick,
  className,
}) {
  return (
    <div
      className={`${classes.cards} ${flipped ? classes.flipped : ""} ${
        matched ? classes.matched : ""
      } ${className}`}
      id={id}
      onClick={() => onClick(id)}
    >
      <img src={cardImage} alt="front card" className={classes["front-card"]} />

      <img src={coverImage} alt="back card" className={classes["back-card"]} />
    </div>
  );
}
