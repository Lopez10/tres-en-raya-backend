import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../core/game.repository';
import { Game, GameStatusEnum as GameStatus } from '../../core/game.interface';
import { UseCase } from 'src/common/useCase.base';

export interface CreateGameDTO {
  id: string;
  status: string;
  board: string[];
  playerId: string;
}

@Injectable()
export class CreateGame implements UseCase<CreateGameDTO, Promise<boolean>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(createGameDTO: CreateGameDTO): Promise<boolean> {
    try {
      const game: Game = {
        id: createGameDTO.id,
        status: createGameDTO.status as GameStatus,
        board: createGameDTO.board,
        playerId: createGameDTO.playerId,
      };
      await this.gameRepository.create(game);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
