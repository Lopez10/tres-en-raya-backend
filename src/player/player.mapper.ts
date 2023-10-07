import { ID } from 'src/common/valueObjects/ID.valueObject';
import { Player } from './core/player.entity';

export interface PlayerDTO {
  id: string;
  username: string;
  wins: number;
  losses: number;
  draws: number;
}

export class PlayerMapper {
  static toDomain(player: PlayerDTO) {
    return Player.create(
      {
        username: player.username,
        wins: player.wins,
        losses: player.losses,
        draws: player.draws,
      },
      new ID(player.id),
    );
  }
  static toPersistence(player: Player): PlayerDTO {
    return {
      id: player.getPropsCopy().id.value,
      username: player.getPropsCopy().username,
      wins: player.getPropsCopy().wins,
      losses: player.getPropsCopy().losses,
      draws: player.getPropsCopy().draws,
    };
  }
}
