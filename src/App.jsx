import classes from "./App.module.css";
import buttonClasses from "./components/Button.module.css";

import coverLogo from "./assets/cover.png";

import Header from "./components/Header";
import Button from "./components/Button";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import GameLog from "./components/GameLog";
import DifficultySelector from "./components/DifficultySelector";
import DifficultyDisplay from "./components/DifficultyDisplay";

import { useAppState } from "./customHooks/useAppState";

export default function App() {
  const {
    state,
    startGame,
    flipCard,
    turnsLeft,
    restartGame,
    showDifficultySelectorOnly,
    dispatch,
  } = useAppState();

  return (
    <div role="application" aria-label="Memory Game Application">
      {!state.gameOver && (
        <Header
          showTurns={state.gameStarted && !state.gameOver}
          turnsLeft={turnsLeft}
        />
      )}

      {/* ACTION BUTTONS */}
      {state.gameStarted && !state.gameOver && (
        <div className={classes["button-container"]}>
          {state.turns >= 1 && (
            <Button
              onClick={restartGame}
              className={buttonClasses["action-btn"]}
            >
              Restart Game
            </Button>
          )}
          <Button
            onClick={showDifficultySelectorOnly}
            className={buttonClasses["action-btn"]}
          >
            Change Difficulty
          </Button>
        </div>
      )}

      {/* Difficulty Selector */}
      {state.showDifficultySelector && (
        <DifficultySelector
          onSelect={(difficulty) => {
            if (difficulty === state.difficulty) {
              dispatch({ type: "CANCEL_DIFFICULTY_SELECTION" }); // Cancel if same mode
              return;
            }
            startGame(difficulty, true); // preserve if different mode selected midgame
          }}
          currentDifficulty={state.difficulty}
          allowBack={state.turns > 0 || state.gameStarted} // show and hide 'Back' button
          onBackToGame={() => {
            dispatch({ type: "CANCEL_DIFFICULTY_SELECTION" });
          }} // Back button, return to the game
        />
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
            <GameLog logEntries={state.logEntries} />
          </main>
          <DifficultyDisplay difficulty={state.difficulty} />
        </>
      )}
    </div>
  );
}
