import { GameDTO, GameMapper } from '../../../src/game/game.mapper';
import { Game } from '../../../src/game/domain/game.entity';
import { GameRepository } from '../../../src/game/domain/game.repository';

export class GameMockRepository implements GameRepository {
  private games: GameDTO[] = [];

  async create(game: Game): Promise<void> {
    const gameDTO = GameMapper.toPersistence(game);
    this.games.push(gameDTO);
  }

  async findById(id: string): Promise<Game | undefined> {
    const gameFounded = this.games.find((game) => game.id === id);

    if (!gameFounded) return undefined;

    return GameMapper.toDomain(gameFounded);
  }

  async update(game: Game): Promise<Game> {
    const gameDTO = GameMapper.toPersistence(game);
    const gameIndex = this.games.findIndex((game) => game.id === gameDTO.id);
    this.games[gameIndex] = gameDTO;

    return GameMapper.toDomain(gameDTO);
  }
}
