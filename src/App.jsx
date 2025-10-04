import classes from "./App.module.css";

import coverLogo from "./assets/cover.png";

import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import GameLog from "./components/GameLog";
import DifficultySelector from "./components/DifficultySelector";

import { useAppState } from "./customHooks/useAppState";

export default function App() {
  const { state, startGame, flipCard, turnsLeft, restartGame } = useAppState();

  return (
    <>
      {!state.gameOver && (
        <Header
          onRestart={restartGame}
          showRestartbutton={
            state.gameStarted && state.turns >= 1 && !state.gameOver
          }
          showTurns={state.gameStarted && !state.gameOver}
          turnsLeft={turnsLeft}
        />
      )}

      {/* Show Difficulty Selector at initial screen */}
      {!state.gameStarted && state.showDifficultySelector && (
        <DifficultySelector onSelect={startGame} />
      )}

      {/* Game Over screen */}
      {state.gameOver && (
        <GameOver
          feedbackText={state.feedback.message}
          feedbackColor={state.feedback.type}
          onRestart={restartGame}
        />
      )}

      {/* Game UI */}
      {state.gameStarted && !state.gameOver && (
        <>
          <main
            style={{ opacity: state.gameStarted ? 1 : 0.3 }}
            className={classes["main-wrapper"]}
          >
            <div
              className={
                state.cards.length > 0
                  ? `${classes["cards-grid"]} ${classes.active}`
                  : classes["cards-grid"]
              }
            >
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
          <GameLog logEntries={state.logEntries} />
        </>
      )}
    </>
  );
}
