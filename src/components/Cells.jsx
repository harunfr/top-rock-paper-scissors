import React from "react";

function Cells(props) {
  const { coords } = props;
  const convertToStyle = (sign) => {
    return {
      backgroundColor:
        sign === "r"
          ? "red"
          : sign === "p"
          ? "green"
          : sign === "s"
          ? "blue"
          : null,
    };
  };

  return (
    <div className="cells">
      {coords?.map((coord, idx) => {
        return (
          <div key={idx} className="cell" style={convertToStyle(coord.sign)}>
            {coord.sign}
          </div>
        );
      })}
    </div>
  );
}

export default Cells;
