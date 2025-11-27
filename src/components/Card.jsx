import React, { useCallback } from "react";

import cardClasses from "./Card.module.css";
import buttonClasses from "./Button.module.css";

import Button from "./Button";

export default React.memo(function Card({
  cardImage,
  coverImage,
  id,
  flipped,
  matched,
  onClick,
}) {
  const handleClick = useCallback(() => onClick(id), [id, onClick]);
  const cardClass = `${cardClasses.cards} ${
    flipped ? cardClasses.flipped : ""
  } ${matched ? cardClasses.matched : ""} ${buttonClasses["card-btn"]}`;

  return (
    <Button
      type="button"
      className={cardClass}
      id={id}
      onClick={handleClick}
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
});
