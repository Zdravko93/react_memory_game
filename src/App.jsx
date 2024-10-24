import { useState, useEffect } from "react";
import classes from "./App.module.css";
import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import GameLog from "./components/GameLog";

// Images
import coverLogo from "./assets/cover.png";
import angularLogo from "./assets/angular.png";
import cssLogo from "./assets/css.png";
import html5Logo from "./assets/html5.png";
import javaScriptLogo from "./assets/javaScript.png";
import reactLogo from "./assets/react.png";
import vueLogo from "./assets/vue.png";

const cardImagePaths = [
  angularLogo,
  cssLogo,
  html5Logo,
  javaScriptLogo,
  reactLogo,
  vueLogo,
];

function App() {
  const [cards, setCards] = useState([]);
  const [gameOpacity, setGameOpacity] = useState(0.3);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [logEntries, setLogEntries] = useState([]);

  const turnsToEndGame = 13;

  const resetCards = (cardsArray) => {
    return cardsArray.map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
  };

  const createShuffleCardsObj = () => {
    const pairedCards = [...cardImagePaths, ...cardImagePaths];
    const shuffledCards = pairedCards.sort(() => Math.random() - 0.5);
    const shuffledCardsObj = resetCards(
      shuffledCards.map((card, index) => ({
        id: `${card} ${index}`,
        image: card,
      }))
    );

    return shuffledCardsObj;
  };

  const resetAndShuffleCards = () => {
    const shuffleObj = createShuffleCardsObj();
    setCards(shuffleObj);
  };

  useEffect(() => {
    resetAndShuffleCards();
  }, []);

  const handleStartGame = () => {
    setGameOpacity(1);
    setTurns(0);
    setGameOver(false);
    setMatchedCards([]);
    setFlippedCards([]);
    setFeedback("");
    setFeedbackColor("");
    setIsGameStarted(true);
    setLogEntries([]);
    resetAndShuffleCards();
  };

  const createLogEntry = (isMatch) => ({
    turn: turns + 1,
    time: new Date().toLocaleString(),
    result: isMatch ? "\u2713" : "\u2716",
  });

  const handleCardClick = (id) => {
    if (!isGameStarted || gameOver) return;

    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.matched || clickedCard.flipped) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );

    const newFlippedCards = [...flippedCards, id];
    setCards(updatedCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const firstCard = updatedCards.find(
        (card) => card.id === newFlippedCards[0]
      );
      const secondCard = updatedCards.find(
        (card) => card.id === newFlippedCards[1]
      );
      const isMatch = firstCard.image === secondCard.image;

      const newEntry = createLogEntry(isMatch);
      setLogEntries((prev) => [...prev, newEntry]);

      if (isMatch) {
        const updatedMatchedCards = updatedCards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, matched: true }; // Mark as matched
          }
          return card;
        });
        setCards(updatedMatchedCards); // Update the cards state
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 400);
      }

      setTurns((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (cards.length === 0) return;

    const allCardsMatched = cards.every((card) => card.matched);
    const turnsToGameOver = turns >= turnsToEndGame;

    // Debugging logs
    console.log("All Cards Matched:", allCardsMatched);
    console.log("Turns to Game Over:", turnsToGameOver);

    if (allCardsMatched || turnsToGameOver) {
      setGameOver(true);
      if (allCardsMatched) {
        setFeedback(`Congratulations! You won in ${turns} turns.`);
        setFeedbackColor("success");
      } else {
        setFeedback("You ran out of turns. Better luck next time!");
        setFeedbackColor("failed");
      }
    }
  }, [cards, turns]);

  return (
    <>
      {gameOver ? (
        <GameOver
          feedbackText={feedback}
          feedbackColor={feedbackColor}
          onRestart={handleStartGame}
        />
      ) : (
        <>
          <Header onStartGame={handleStartGame} />
          <main
            style={{ opacity: gameOpacity }}
            className={classes["main-wrapper"]}
          >
            <div className={classes["cards-grid"]}>
              {cards.map((card) => (
                <Card
                  cardImage={card.image}
                  coverImage={coverLogo}
                  id={card.id}
                  key={card.id}
                  flipped={card.flipped}
                  matched={card.matched}
                  onClick={handleCardClick}
                  className={isGameStarted ? "" : "disabled"}
                />
              ))}
            </div>
          </main>
          {isGameStarted && (
            <GameLog numberOfTurns={turns} logEntries={logEntries} />
          )}
        </>
      )}
    </>
  );
}

export default App;

// 1. User MUST NOT be able to interact with cards before chosen pair  of cards flipps back or matches
// 2. USer MUST BE able to flip the chosed card back (in every cycle its the first card) in case he misclicked or he changes his mind etc
