export function minimax(
  board: string[],
  depth: number,
  isMaximizing: boolean,
): number {
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        const currentScore = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(bestScore, currentScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        const currentScore = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(bestScore, currentScore);
      }
    }
    return bestScore;
  }
}
