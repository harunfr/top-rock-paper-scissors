import React from "react";

function PreviousRound(props) {
  const { prevComputerSign, prevPlayerSign, roundWinner } = props;
  if (prevComputerSign) {
    return (
      <div className="previous-round  flex-section">
        <h2 className="title">Results</h2>
        {roundWinner && (
          <div className="winner">
            {roundWinner === "Draw" ? roundWinner : `Winner: ${roundWinner}`}
          </div>
        )}
        <div className="player-selection-prev">You were {prevPlayerSign}</div>
        <div className="computer-selection-prev">
          Computer were {prevComputerSign}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default PreviousRound;
