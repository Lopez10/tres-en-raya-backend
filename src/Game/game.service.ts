import { Inject, Injectable } from '@nestjs/common';
import { GameRepositoryInterface } from './game.repository.interface';
import { Game } from './game.interface';

@Injectable()
export class GameService {
  constructor(
    @Inject(GameRepositoryInterface)
    private readonly gameRepository: GameRepositoryInterface,
  ) {}

  async createGame(game: Game): Promise<void> {
    try {
      await this.gameRepository.insert(game);
    } catch (error) {
      throw error;
    }
  }
}
