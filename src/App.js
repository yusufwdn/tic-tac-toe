import { useState } from "react";

/** square component */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/** board component */
function Board({ xIsNext, squares, onPlay }) {
  /** this function created for handling the square buttons */
  function handleClick(i) {
    /** checking there is a winner and checking if the current square is not null / has been filled? */
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /** copying the current squares to new array nextSquares */
    const nextSquares = squares.slice();

    /** checking xIsNext for giving the value to nextSquares[i] */
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  /** state for checking the winner */
  const winner = calculateWinner(squares);
  let status;

  /** checking is winner is exist? */
  if (winner) {
    /** showing the winner */
    status = "Winner: " + winner;
  } else {
    /** showing the next player turn */
    status = "Next player: " + (xIsNext ? "X" : "O");
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

export default function Game() {
  /** create array of array with 9 element and filled with null values */
  const [history, setHistory] = useState([Array(9).fill(null)]);

  /** state for checking the next player turn */
  const [xIsNext, setXIsNext] = useState(true);

  /** state for detect the current move of player */
  const [currentMove, setCurrentMove] = useState(0);

  /** set default value currentSquares = currentMove */
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    /** merge history and nextSquares array, then make it the new history value*/
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    /** set history with new data */
    setHistory(nextHistory);

    /** set current move based on nextHistory.length - 1 */
    setCurrentMove(nextHistory.length - 1);

    /** changing the next turn */
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    /** adjust currentMove based on nextMove props */
    setCurrentMove(nextMove);

    /** adjust next turn based on nextMove props */
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    /** checking move key */
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
