import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { Game, GameStatusEnum as GameStatus } from '../../domain/game.interface';
import { UseCase } from 'src/common/useCase.base';

export interface CreateGameDTO {
  id: string;
  status: string;
  turn: string;
  board: string[];
  playerId: string;
}

@Injectable()
export class CreateGame implements UseCase<CreateGameDTO, Promise<void>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(createGameDTO: CreateGameDTO): Promise<void> {
    try {
      const game: Game = {
        id: createGameDTO.id,
        status: createGameDTO.status as GameStatus,
        turn: createGameDTO.turn,
        board: createGameDTO.board,
        playerId: createGameDTO.playerId,
      };
      const gameCreated = await this.gameRepository.create(game);
      return gameCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
