import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../core/game.repository';
import { Game } from '../../core/game.interface';
import { UseCase } from 'src/common/useCase.base';

@Injectable()
export class CreateGame implements UseCase<Game, void> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(game: Game): Promise<boolean> {
    try {
      await this.gameRepository.create(game);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
