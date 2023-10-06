import { Inject, Injectable } from '@nestjs/common';
import { GameRepositoryInterface } from '../../game.repository.interface';
import { Game } from '../../game.interface';
import { UseCase } from 'src/common/useCase.base';

@Injectable()
export class CreateGame implements UseCase<Game, void> {
  constructor(
    @Inject(GameRepositoryInterface)
    private readonly gameRepository: GameRepositoryInterface,
  ) {}
  async run(game: Game): Promise<boolean> {
    try {
      await this.gameRepository.insert(game);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
