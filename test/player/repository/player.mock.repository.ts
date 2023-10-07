import { ID } from '../../../src/common/valueObjects/ID.valueObject';
import { Player } from '../../../src/player/domain/player.entity';
import { PlayerRepository } from '../../../src/player/domain/player.repository';
import { PlayerDTO, PlayerMapper } from '../../../src/player/player.mapper';

export class PlayerMockRepository implements PlayerRepository {
  private players: PlayerDTO[] = [];

  async create(player: Player): Promise<void> {
    const playerDTO = PlayerMapper.toPersistence(player);
    this.players.push(playerDTO);
  }

  async findByUsername(username: string): Promise<Player | undefined> {
    const playerFounded = this.players.find(
      (player) => player.username === username,
    );

    if (!playerFounded) return undefined;
    const player = PlayerMapper.toDomain(playerFounded);

    return player;
  }

  async findById(id: string | ID): Promise<Player | undefined> {
    const playerFounded = this.players.find((player) => player.id === id);

    if (!playerFounded) return undefined;
    const player = PlayerMapper.toDomain(playerFounded);

    return player;
  }

  async update(player: Player): Promise<Player> {
    const playerToUpdate = PlayerMapper.toPersistence(player);
    this.players = this.players.map((player) =>
      player.id === playerToUpdate.id ? playerToUpdate : player,
    );

    return player;
  }
}
