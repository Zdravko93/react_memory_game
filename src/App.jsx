import classes from "./App.module.css";

import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import GameLog from "./components/GameLog";

import coverLogo from "./assets/cover.png";

import { useAppState } from "./customHooks/useAppState";

function App() {
  const { state, startGame, flipCard } = useAppState();

  return (
    <>
      {state.gameOver ? (
        <GameOver
          feedbackText={state.feedback.message}
          feedbackColor={state.feedback.type}
          onRestart={startGame}
        />
      ) : (
        <>
          <Header onStartGame={startGame} />
          <main
            style={{ opacity: state.gameStarted ? 1 : 0.3 }}
            className={classes["main-wrapper"]}
          >
            <div className={classes["cards-grid"]}>
              {state.cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  cardImage={card.image}
                  coverImage={coverLogo}
                  flipped={card.flipped}
                  matched={card.matched}
                  onClick={flipCard}
                />
              ))}
            </div>
          </main>
          {state.gameStarted && <GameLog logEntries={state.logEntries} />}
        </>
      )}
    </>
  );
}

export default App;
