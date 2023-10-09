import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';

export interface CreateGameDTO {
  playerId: string;
}

@Injectable()
export class CreateGameUseCase
  implements UseCase<CreateGameDTO, Promise<Game>>
{
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run({ playerId }: CreateGameDTO): Promise<Game> {
    try {
      const newEmptyGame = Game.create({
        playerId,
        board: ['', '', '', '', '', '', '', '', ''],
        turn: playerId,
        status: 'IN_PROGRESS',
      });
      await this.gameRepository.create(newEmptyGame);

      return newEmptyGame;
    } catch (error) {
      throw new Error(error);
    }
  }
}
