import { Entity } from '../../common/entity.base';
import { ID } from '../../common/valueObjects/ID.valueObject';
import { minimax } from './miniMax';

interface GameProps {
  status: 'IN_PROGRESS' | 'FINISHED';
  turn: string;
  board: string[];
  playerId: string;
}

export class Game extends Entity<GameProps> {
  private constructor(props: GameProps, id?: ID) {
    super(props, id);
  }

  public thereAreMovements(): boolean {
    return this.props.board.filter((cell) => cell === '').length > 0;
  }

  public isFinished(): boolean {
    return this.props.status === 'FINISHED';
  }

  public finishTheGame(): void {
    this.props.status = 'FINISHED';
    // Update the player ranking with a lost|win|draw
  }

  public isWinnerMovement(): boolean {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.props.board[a] &&
        this.props.board[a] === this.props.board[b] &&
        this.props.board[a] === this.props.board[c]
      ) {
        return true;
      }
    }
    return false;
  }

  public moveIAAlgorithm(): void {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < this.props.board.length; i++) {
      if (this.props.board[i] === '') {
        // Si la casilla está vacía, intenta colocar 'O' y evalúa el tablero
        this.props.board[i] = 'O';
        const score = -minimax(this.props.board, 0, false);
        this.props.board[i] = ''; // Deshaz el movimiento

        // Si la puntuación es mejor que la mejor puntuación actual, actualiza
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    this.props.board[bestMove] = 'O';
    this.validateGameStatus();
  }

  public validateGameStatus(): void {
    if (!this.thereAreMovements() || this.isWinnerMovement()) {
      this.finishTheGame();
    }
  }

  public static create(props: GameProps, id?: ID): Game {
    const game = new Game(props, id);

    return game;
  }
}
