import React from "react";

function Selection(props) {
  const { isPlayer, signName } = props;

  return (
    <div>
      {isPlayer ? "You" : "Computer"} Choose: {signName}
    </div>
  );
}

export default Selection;
