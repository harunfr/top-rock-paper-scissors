import React from "react";

function SignButton(props) {
  const { sign, gameWinner, computerSign, selectionHandler } = props;
  const signToNameMap = {
    r: "Rock",
    p: "Paper",
    s: "Scissors",
  };
  const getStyleFromSign = (computerSign, sign) => {
    return {
      backgroundColor:
        computerSign === sign
          ? "gray"
          : sign === "r"
          ? "red"
          : sign === "p"
          ? "green"
          : sign === "s"
          ? "blue"
          : null,
    };
  };
  return (
    <button
      disabled={gameWinner}
      style={getStyleFromSign(computerSign, sign)}
      onClick={() => selectionHandler(sign)}
      className="selection-btn btn"
    >
      <h3 className="btn-title">{signToNameMap[sign]}</h3>
      <p className="sign">"{sign}"</p>
    </button>
  );
}

export default SignButton;
