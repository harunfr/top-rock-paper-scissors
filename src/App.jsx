import React, { useEffect, useState } from "react";

import "./App.css";
import Game from "./Game";
/* Components */
import Cells from "./components/Cells";
import SignButton from "./components/SignButton";
import Selection from "./components/Selection";
import Score from "./components/Score";
import PreviousRound from "./components/PreviousRound";
import GameWinner from "./components/GameWinner";

const game = new Game();
game.initializeNewRound();
const coordsClone = game.coords.slice(0);
const signToNameMap = {
  r: "Rock",
  p: "Paper",
  s: "Scissors",
};

function App() {
  const [gameCoords, setGameCoords] = useState(coordsClone);
  const [signs, setSigns] = useState({
    computerSign: game.computerSign,
    playerSign: null,
  });
  const [prevSigns, setPrevSigns] = useState({
    prevComputerSign: null,
    prevPlayerSign: null,
  });
  const [scores, setScores] = useState({
    playerScore: 0,
    computerScore: 0,
  });
  const [roundWinner, setRoundWinner] = useState(null);
  const [gameWinner, setGameWinner] = useState(null);

  useEffect(() => {
    game.coordsSetter = setGameCoords;
    game.signsSetter = setSigns;
    game.scoreSetter = setScores;
    game.prevSignsSetter = setPrevSigns;
    game.roundWinnerSetter = setRoundWinner;
    game.gameWinnerSetter = setGameWinner;
  }, []);

  const handleSelection = (sign) => {
    if (sign !== game.computerSign) {
      game.playerSign = sign;
      setSigns({
        computerSign: game.computerSign,
        playerSign: game.playerSign,
      });
      game.playOneTurn();
    }
  };

  return (
    <div className="main-wrapper">
      <div className="left-side-container flex-section">
        {/* Message and Controls */}
        <div className="message-and-controls flex-section">
          <h2 className="message">Best of 5 wins.</h2>
          <div className="controls">
            <SignButton
              sign={"r"}
              gameWinner={gameWinner}
              computerSign={signs.computerSign}
              selectionHandler={handleSelection}
            />
            <SignButton
              sign={"p"}
              gameWinner={gameWinner}
              computerSign={signs.computerSign}
              selectionHandler={handleSelection}
            />
            <SignButton
              sign={"s"}
              gameWinner={gameWinner}
              computerSign={signs.computerSign}
              selectionHandler={handleSelection}
            />
          </div>
        </div>

        {/* Current Round and Scores */}
        <div className="current-round-and-scores flex-section">
          <div className="current-round flex-section">
            <h2 className="current-round-title title">
              Current Round and Scores
            </h2>
            <div className="selections  flex-section">
              <Selection isPlayer signName={signToNameMap[signs.playerSign]} />
              <Selection signName={signToNameMap[signs.computerSign]} />
            </div>
          </div>

          {/* Scores */}
          <div className="scores direction-row">
            <Score isPlayer score={scores.playerScore} />
            <Score score={scores.computerScore} />
          </div>
        </div>

        {/* Previous Round - Results */}
        <PreviousRound
          prevComputerSign={signToNameMap[prevSigns.prevComputerSign]}
          prevPlayerSign={signToNameMap[prevSigns.prevPlayerSign]}
          roundWinner={roundWinner}
        />
        {/* Game Winner */}
        <GameWinner winner={gameWinner} />
      </div>
      <Cells coords={gameCoords} />
    </div>
  );
}

export default App;
