//
// PUBLIC_INTERFACE
/**
 * Calculate the winner of a tic tac toe board.
 * @param {Array<string|null>} squares - 9-length array representing board cells with 'X', 'O', or null
 * @returns {Object|null} Returns { winner: 'X'|'O', line: number[] } or null if no winner
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
/**
 * Determine if the board is full.
 * @param {Array<string|null>} squares - 9-length array representing board cells with 'X', 'O', or null
 * @returns {boolean} true if all cells are non-null
 */
export function isBoardFull(squares) {
  return squares.every((cell) => cell !== null);
}

/**
 * Get all available (empty) cell indices.
 * @param {Array<string|null>} squares
 * @returns {number[]} indexes of empty cells
 */
function getAvailableMoves(squares) {
  const moves = [];
  for (let i = 0; i < squares.length; i += 1) {
    if (!squares[i]) moves.push(i);
  }
  return moves;
}

/**
 * Try placing symbol at each empty cell to see if it results in a win.
 * @param {Array<string|null>} squares
 * @param {'X'|'O'} symbol
 * @returns {number|null} winning move index or null if none
 */
function findWinningMove(squares, symbol) {
  const empties = getAvailableMoves(squares);
  for (let i = 0; i < empties.length; i += 1) {
    const idx = empties[i];
    const next = squares.slice();
    next[idx] = symbol;
    if (calculateWinner(next)) {
      return idx;
    }
  }
  return null;
}

// PUBLIC_INTERFACE
/**
 * Very basic AI:
 * 1) Win if possible
 * 2) Block opponent if they can win next
 * 3) Take center
 * 4) Take a corner
 * 5) Take a side
 *
 * @param {Array<string|null>} squares - current board
 * @param {'X'|'O'} aiSymbol - symbol for the AI, default 'O'
 * @param {'X'|'O'} humanSymbol - symbol for the human, default 'X'
 * @returns {number|null} chosen move index or null if no moves
 */
export function getBestAIMove(squares, aiSymbol = 'O', humanSymbol = 'X') {
  const available = getAvailableMoves(squares);
  if (available.length === 0) return null;

  // 1. Try to win
  const winMove = findWinningMove(squares, aiSymbol);
  if (winMove !== null) return winMove;

  // 2. Block human win
  const blockMove = findWinningMove(squares, humanSymbol);
  if (blockMove !== null) return blockMove;

  // 3. Take center
  if (squares[4] === null) return 4;

  // 4. Take a corner
  const corners = [0, 2, 6, 8].filter((i) => squares[i] === null);
  if (corners.length > 0) return corners[0];

  // 5. Take a side
  const sides = [1, 3, 5, 7].filter((i) => squares[i] === null);
  if (sides.length > 0) return sides[0];

  return available[0];
}
