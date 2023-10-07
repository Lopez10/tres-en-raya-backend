import { GameDTO, GameMapper } from '../../src/game/game.mapper';
import { ID } from '../../src/common/valueObjects/ID.valueObject';
import { Game } from '../../src/game/domain/game.entity';
import { GameRepository } from '../../src/game/domain/game.repository';

export class GameMockRepository implements GameRepository {
  private games: GameDTO[] = [];

  async create(game: Game): Promise<void> {
    const gameDTO = GameMapper.toPersistence(game);
    this.games.push(gameDTO);
  }

  async findById(id: ID): Promise<Game | undefined> {
    const gameFounded = this.games.find((game) => game.id === id.value);

    if (!gameFounded) return undefined;

    return GameMapper.toDomain(gameFounded);
  }
}
