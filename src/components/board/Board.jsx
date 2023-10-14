import React from "react";
import { calculateWinner } from "../../utils/calculateWinner";
import Square from "../square/Square";
import "./styles.css";

const Board = ({ xIsNext, squares, onPlay, currentMove }) => {
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line;

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (currentMove === 9) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = Math.sqrt(squares.length);
  let board = [];
  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      const index = i * boardSize + j;
      const isWinningSquare = winningLine?.includes(index);
      row.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinningSquare={isWinningSquare}
        />
      );
    }
    board.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
};

export default Board;
