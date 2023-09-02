import { useState } from "react";

/** square component */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/** board component as the main component of App.js */
export default function Board() {
  /** create squares array with 9 element and filled with null values */
  const [squares, setSquares] = useState(Array(9).fill(null));

  /** state for checking the next player turn */
  const [xIsNext, setXIsNext] = useState(true);

  /** state for checking the winner */
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  /** handling function after click the buttons */
  function handleClick(index) {
    /** avoid multiple click in a button and checking the winner */
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    /** copy squares array to new variable named nextSquares using slice method */
    const nextSquares = squares.slice();

    /** checking the next turn is 'X' or 'O' */
    if (xIsNext) {
      /** set the value of given index to "X" */
      nextSquares[index] = "X";
    } else {
      /** set the value of given index to "O" */
      nextSquares[index] = "O";
    }

    /** finally set the squares state value with nextSquares */
    setSquares(nextSquares);

    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /** loops the possible winning lines */
  for (let i = 0; i < lines.length; i++) {
    /** initialize value of current lines */
    const [a, b, c] = lines[i];

    /**
     * checking is index a of the squares is exist?
     * if yes, compare index a with b and c on squares.
     * if the result is true, that is the winner of this game
     */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
