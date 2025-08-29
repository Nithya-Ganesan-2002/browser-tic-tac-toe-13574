import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GameStatus - shows the current status text of the game.
 * Props:
 * - status: string to display
 * - subtext?: optional string to display below status
 */
export default function GameStatus({ status, subtext }) {
  return (
    <div className="game-status" aria-live="polite">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      {subtext ? <div className="subtext">{subtext}</div> : null}
    </div>
  );
}
