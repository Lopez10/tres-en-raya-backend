import { Entity } from '../../common/entity.base';
import { ID } from '../../common/valueObjects/ID.valueObject';

interface playerProps {
  username: string;
  wins: number;
  losses: number;
  draws: number;
}

export class Player extends Entity<playerProps> {
  private constructor(props: playerProps, id?: ID) {
    super(props, id);
  }

  public updateRanking(result: string): void {
    const resultMapping = {
      WIN: 'wins',
      LOST: 'losses',
      DRAW: 'draws',
    };

    const rankingProperty = resultMapping[result];
    this.props[rankingProperty] += 1;
  }

  public static create(props: playerProps, id?: ID): Player {
    const player = new Player(props, id);

    return player;
  }
}
