import { Entity } from '../../common/entity.base';
import { ID } from '../../common/valueObjects/ID.valueObject';

export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export interface GameProps {
  status: GameStatus;
  turn: string;
  board: string[];
  playerId: string;
}

export class Game extends Entity<GameProps> {
  private constructor(props: GameProps, id?: ID) {
    super(props, id);
  }

  public static create(props: GameProps, id?: ID): Game {
    const player = new Game(props, id);

    return player;
  }
}
