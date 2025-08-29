import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board - renders the 3x3 tic tac toe grid.
 * Props:
 * - squares: Array(9) of 'X' | 'O' | null
 * - onCellClick: function(index) called when a square is clicked
 * - winningLine: number[] | null - indices of the winning line to highlight
 */
export default function Board({ squares, onCellClick, winningLine }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      index={i}
      value={squares[i]}
      highlight={Array.isArray(winningLine) && winningLine.includes(i)}
      onClick={() => onCellClick(i)}
    />
  );

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row" role="row">
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return renderSquare(idx);
          })}
        </div>
      ))}
    </div>
  );
}
