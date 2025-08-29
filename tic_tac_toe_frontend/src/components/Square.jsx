import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square - a single clickable cell in the tic tac toe grid.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: function to call when clicked
 * - highlight: boolean indicating if this square is part of a winning line
 * - index: number for accessibility labeling
 */
export default function Square({ value, onClick, highlight = false, index }) {
  return (
    <button
      type="button"
      className={`ttt-square ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
      aria-label={`Cell ${index + 1} ${value ? `with ${value}` : 'empty'}`}
    >
      {value}
    </button>
  );
}
