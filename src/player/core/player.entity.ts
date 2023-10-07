import { Entity } from 'src/common/entity.base';
import { ID } from 'src/common/valueObjects/ID.valueObject';

export interface playerProps {
  username: string;
  wins: number;
  losses: number;
  draws: number;
}

export class Player extends Entity<playerProps> {
  private constructor(props: playerProps, id?: ID) {
    super(props, id);
  }

  public static create(props: playerProps, id?: ID): Player {
    const player = new Player(props, id);

    return player;
  }
}
