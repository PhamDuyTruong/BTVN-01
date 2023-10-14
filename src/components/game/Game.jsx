import React, { useState } from "react";
import Board from "../board/Board";
import "./styles.css";

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const current = history[currentMove];
  const currentSquares = current.squares;

  const handlePlay = (nextSquares, i) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, lastMove: i },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((step, move) => {
    let description;
    if (move === currentMove) {
      description = "You are at move #" + move;
      return <li key={move}>{description}</li>;
    } else {
      if (move > 0) {
        const row = Math.floor(step.lastMove / 3) + 1;
        const col = (step.lastMove % 3) + 1;
        description = `(${row}, ${col})`;
      } else {
        description = "Restart game";
      }
      return (
        <li key={move}>
          <button className="history-btn" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    }
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div className="list">
          <p style={{ marginBottom: "5px", fontWeight: "500" }}>History list</p>
          <ol>{moves}</ol>
        </div>
        <button
          className="button-sort"
          onClick={() => setIsAscending(!isAscending)}
        >
          {isAscending ? "Sort descending" : "Sort ascending"}
        </button>
      </div>
    </div>
  );
};

export default Game;
