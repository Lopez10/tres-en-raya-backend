import { Entity } from '../../common/entity.base';
import { ID } from '../../common/valueObjects/ID.valueObject';

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

  public static create(props: GameProps, id?: ID): Game {
    const player = new Game(props, id);

    return player;
  }
}
