import { Game } from 'src/Game/game.interface';
import { GameRepositoryInterface } from 'src/Game/game.repository.interface';

export class GameMockRepository implements GameRepositoryInterface {
  private games: Game[] = [];

  async insert(game: Game): Promise<void> {
    this.games.push(game);
  }

  async findById(id: string): Promise<Game | undefined> {
    return this.games.find((game) => game.id === id);
  }
}
