import { Game } from 'src/game/domain/game.interface';
import { GameRepository } from 'src/game/domain/game.repository';

export class GameMockRepository implements GameRepository {
  private games: Game[] = [];

  async create(game: Game): Promise<void> {
    this.games.push(game);
  }

  async findById(id: string): Promise<Game | undefined> {
    return this.games.find((game) => game.id === id);
  }
}
