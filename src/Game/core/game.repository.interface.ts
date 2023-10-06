import { Game } from './game.interface';

export interface GameRepositoryInterface {
  insert(game: Game): Promise<void>;
  findById(id: string): Promise<Game | undefined>;
}

export const GameRepositoryInterface = Symbol('GameRepositoryInterface');
