import { Game } from 'src/Game/Game.interface';
import { GameRepositoryInterface } from 'src/Game/Game.repository.interface';

export class GameMockRepository implements GameRepositoryInterface {
  private games: Game[] = [];

  async insert(game: Game): Promise<void> {
    this.games.push(game);
  }

  async findById(id: string): Promise<Game | undefined> {
    return this.games.find((game) => game.id === id);
  }
}
