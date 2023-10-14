import React from "react";
import "./styles.css";

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  const style = isWinningSquare
    ? { backgroundColor: "#ff0", textDecoration: "line-through" }
    : null;
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
};

export default Square;
