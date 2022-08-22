import React from "react";

function GameWinner(props) {
  const { winner } = props;

  if (winner) {
    return (
      <div className="game-winner flex-section">
        <h2 className="title">Winner is: </h2>
        <p className="game-winner-name">{winner}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default GameWinner;
