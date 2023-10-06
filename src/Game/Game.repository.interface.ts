import { Game } from './Game.interface';

export interface GameRepositoryInterface {
  insert(game: Game): Promise<void>;
  findById(id: string): Promise<Game | undefined>;
}
