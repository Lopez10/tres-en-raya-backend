import { Entity } from '../../common/entity.base';
import { ID } from '../../common/valueObjects/ID.valueObject';
import { minimax } from './miniMax';

const OTHER_PLAYER = 'IA';

interface GameProps {
  status: 'IN_PROGRESS' | 'FINISHED';
  turn: string;
  board: string[];
  playerId: string;
  winner: string;
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
    if (this.isFinished()) {
      return;
    }
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < this.props.board.length; i++) {
      if (this.props.board[i] === '') {
        this.props.board[i] = 'O';
        const score = -minimax(this.props.board, 0, false);
        this.props.board[i] = '';

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    this.props.board[bestMove] = 'O';
    this.props.turn = OTHER_PLAYER;

    this.checksAndFinishTheGame();

    this.props.turn = this.props.playerId;
  }

  public checksAndFinishTheGame(): void {
    if (this.isWinnerMovement()) {
      this.props.winner = this.props.turn;
      this.finishTheGame();
      return;
    }
    if (!this.thereAreMovements()) {
      this.finishTheGame();
    }
  }

  public getStateFinishedGame(): string {
    if (!this.isFinished()) {
      return;
    }
    if (this.props.winner === OTHER_PLAYER) {
      return 'LOST';
    }
    if (this.props.winner === this.props.playerId) {
      return 'WIN';
    }
    return 'DRAW';
  }

  public static create(props: GameProps, id?: ID): Game {
    const game = new Game(props, id);

    return game;
  }
}
