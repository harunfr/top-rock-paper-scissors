import React from "react";

function Score(props) {
  const { isPlayer, score } = props;

  return (
    <div>
      {isPlayer ? "Player" : "Computer"} score: {score}
    </div>
  );
}

export default Score;
