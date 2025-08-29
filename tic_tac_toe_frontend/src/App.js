import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import Controls from './components/Controls';
import { calculateWinner, getBestAIMove, isBoardFull } from './utils/game';

// PUBLIC_INTERFACE
/**
 * App - Main entry component that renders the Tic Tac Toe game.
 * Provides:
 * - Responsive centered layout
 * - Game modes: Player vs Player and Player vs Computer (basic AI)
 * - Win and draw detection
 * - Minimalistic light theme using provided colors
 */
function App() {
  // Theme is fixed to light as per requirements, but left here for future extension if needed
  const [theme] = useState('light');

  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xStarts, setXStarts] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('ai'); // 'pvp' | 'ai'

  // Derived state
  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => !winnerInfo && isBoardFull(squares), [winnerInfo, squares]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle human click
  // PUBLIC_INTERFACE
  /**
   * Handle a click on a board cell.
   * @param {number} index - cell index from 0..8
   */
  const handleCellClick = (index) => {
    if (winnerInfo || squares[index]) return;

    // Place current player's mark
    const currentSymbol = xIsNext ? 'X' : 'O';
    const nextSquares = squares.slice();
    nextSquares[index] = currentSymbol;
    setSquares(nextSquares);

    // If game ends after this move, stop here
    const nextWinner = calculateWinner(nextSquares);
    const nextDraw = !nextWinner && isBoardFull(nextSquares);

    if (nextWinner || nextDraw) {
      setXIsNext(!xIsNext);
      return;
    }

    // Toggle turn
    setXIsNext(!xIsNext);
  };

  // AI move effect
  useEffect(() => {
    if (mode !== 'ai') return;
    if (winnerInfo || draw) return;

    const aiSymbol = xStarts ? 'O' : 'X';
    const humanSymbol = xStarts ? 'X' : 'O';
    const aiTurn = (xIsNext && aiSymbol === 'X') || (!xIsNext && aiSymbol === 'O');

    if (!aiTurn) return;

    const timeout = setTimeout(() => {
      const move = getBestAIMove(squares, aiSymbol, humanSymbol);
      if (move === null) return;
      const nextSquares = squares.slice();
      nextSquares[move] = aiSymbol;
      setSquares(nextSquares);

      // Toggle turn after AI move
      setXIsNext(!xIsNext);
    }, 350);

    return () => clearTimeout(timeout);
  }, [mode, squares, xIsNext, winnerInfo, draw, xStarts]);

  // PUBLIC_INTERFACE
  /**
   * Reset the board and start a fresh game maintaining current settings.
   */
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(xStarts);
  };

  // PUBLIC_INTERFACE
  /**
   * Change the game mode and reset.
   * @param {'pvp'|'ai'} newMode
   */
  const changeMode = (newMode) => {
    setMode(newMode);
    // Reset game when switching mode
    setSquares(Array(9).fill(null));
    setXIsNext(xStarts);
  };

  // PUBLIC_INTERFACE
  /**
   * Toggle which symbol starts (X or O) and reset the game.
   */
  const toggleStarter = () => {
    const next = !xStarts;
    setXStarts(next);
    setSquares(Array(9).fill(null));
    setXIsNext(next);
  };

  // Status text
  let statusText = '';
  if (winnerInfo) {
    statusText = `Winner: ${winnerInfo.winner}`;
  } else if (draw) {
    statusText = 'Draw';
  } else {
    const current = xIsNext ? 'X' : 'O';
    statusText = `Turn: ${current}`;
  }

  const subtext =
    mode === 'ai'
      ? `Mode: Player vs Computer — You are ${xStarts ? 'X' : 'O'}`
      : 'Mode: Player vs Player';

  return (
    <div className="App">
      <main className="container">
        <GameStatus status={statusText} subtext={subtext} />
        <div className="board-wrap">
          <Board
            squares={squares}
            onCellClick={(i) => {
              // Prevent humans from playing when it's AI's turn
              if (
                mode === 'ai' &&
                !winnerInfo &&
                !draw
              ) {
                const aiSymbol = xStarts ? 'O' : 'X';
                const humanTurn = (xIsNext && aiSymbol !== 'X') || (!xIsNext && aiSymbol !== 'O');
                if (!humanTurn) return;
              }
              handleCellClick(i);
            }}
            winningLine={winnerInfo ? winnerInfo.line : null}
          />
        </div>
        <Controls
          mode={mode}
          onModeChange={changeMode}
          onReset={resetGame}
          xStarts={xStarts}
          onToggleStarter={toggleStarter}
        />
      </main>
      <footer className="footer">
        <span>Built with React</span>
      </footer>
    </div>
  );
}

export default App;
