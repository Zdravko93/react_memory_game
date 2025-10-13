import cardClasses from "./Card.module.css";
import buttonClasses from "./Button.module.css";

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
      className={`${cardClasses.cards} ${flipped ? cardClasses.flipped : ""} ${
        matched ? cardClasses.matched : ""
      } ${buttonClasses["card-btn"]}`}
      id={id}
      onClick={() => onClick(id)}
      disabled={matched} // prevent clicking if already matched
      aria-pressed={flipped}
      aria-label={flipped ? `Card ${id}, showing front` : `Card ${id}, hidden`}
    >
      <img
        src={cardImage}
        alt=""
        className={cardClasses["front-card"]}
        aria-hidden={!flipped}
      />

      <img
        src={coverImage}
        alt=""
        className={cardClasses["back-card"]}
        aria-hidden={!flipped}
      />
    </Button>
  );
}
