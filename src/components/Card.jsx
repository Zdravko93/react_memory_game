import classes from "./Card.module.css";

import Button from "./Button";

export default function Card({
  cardImage,
  coverImage,
  id,
  flipped,
  matched,
  onClick,
}) {
  return (
    <Button
      type="button"
      className={`${classes.cards} ${flipped ? classes.flipped : ""} ${
        matched ? classes.matched : ""
      } ${classes.cards}`}
      id={id}
      onClick={() => onClick(id)}
      disabled={matched} // prevent clicking if already matched
      aria-pressed={flipped}
      aria-label={flipped ? "Flipped card" : "Hidden card"}
    >
      <img
        src={cardImage}
        alt="Front of card"
        className={classes["front-card"]}
        aria-hidden={!flipped}
      />

      <img
        src={coverImage}
        alt="Back of card"
        className={classes["back-card"]}
        aria-hidden={!flipped}
      />
    </Button>
  );
}
