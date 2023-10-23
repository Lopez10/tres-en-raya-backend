import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';

export interface CreateGameDTO {
  playerId: string;
  username: string;
}

@Injectable()
export class CreateGameUseCase
  implements UseCase<CreateGameDTO, Promise<Game>>
{
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}

  async run({ username }: CreateGameDTO): Promise<Game> {
    try {
      const newEmptyGame = Game.create({
        username,
        board: ['', '', '', '', '', '', '', '', ''],
        turn: username,
        status: 'IN_PROGRESS',
        winner: null,
      });

      await this.gameRepository.create(newEmptyGame);
      return newEmptyGame;
    } catch (error) {
      throw new Error(error);
    }
  }
}
