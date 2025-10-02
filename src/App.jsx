import classes from "./App.module.css";
import coverLogo from "./assets/cover.png";

import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import GameLog from "./components/GameLog";
import DifficultySelector from "./components/DifficultySelector";

import { useAppState } from "./customHooks/useAppState";

// function App() {
//   const { state, startGame, flipCard, turnsLeft, showDifficultySelector } =
//     useAppState();

//   return (
//     <>
//       {state.gameOver ? (
//         <GameOver
//           feedbackText={state.feedback.message}
//           feedbackColor={state.feedback.type}
//           onRestart={startGame}
//         />
//       ) : (
//         <>
//           <Header
//             onStartGame={startGame}
//             showStartbutton={
//               !state.gameStarted || (state.gameStarted && state.turns > 0)
//             }
//             label={
//               state.turns > 0 || state.gameOver ? "Restart Game" : "Start Game"
//             }
//             turnsLeft={turnsLeft}
//             showTurns={state.gameStarted}
//           />
//           <main
//             style={{ opacity: state.gameStarted ? 1 : 0.3 }}
//             className={classes["main-wrapper"]}
//           >
//             <div
//               className={
//                 state.cards.length > 0
//                   ? `${classes["cards-grid"]} ${classes.active}`
//                   : classes["cards-grid"]
//               }
//             >
//               {state.cards.map((card) => (
//                 <Card
//                   key={card.id}
//                   id={card.id}
//                   cardImage={card.image}
//                   coverImage={coverLogo}
//                   flipped={card.flipped}
//                   matched={card.matched}
//                   onClick={flipCard}
//                 />
//               ))}
//             </div>
//           </main>
//           {state.gameStarted && <GameLog logEntries={state.logEntries} />}
//         </>
//       )}
//     </>
//   );
// }

// export default App;

function App() {
  const { state, startGame, flipCard, turnsLeft, showDifficultySelector } =
    useAppState();

  return (
    <>
      {/* Initial screen: show header with "Start Game" button */}
      {!state.gameStarted &&
        !state.gameOver &&
        !state.showDifficultySelector && (
          <Header
            onStartGame={showDifficultySelector}
            showStartbutton={true}
            label="Start Game"
            showTurns={false}
          />
        )}

      {/* Show Difficulty Selector after "Start Game" is clicked */}
      {!state.gameStarted && state.showDifficultySelector && (
        <DifficultySelector onSelect={startGame} />
      )}

      {/* Game Over screen */}
      {state.gameOver && (
        <GameOver
          feedbackText={state.feedback.message}
          feedbackColor={state.feedback.type}
          onRestart={startGame}
        />
      )}

      {/* Game UI during play */}
      {state.gameStarted && !state.gameOver && (
        <>
          <Header
            onStartGame={showDifficultySelector} // restart flow
            showStartbutton={true}
            label="Restart Game"
            turnsLeft={turnsLeft}
            showTurns={true}
          />
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

export default App;
