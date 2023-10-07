import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';
import { GameMapper } from '../../game.mapper';

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
      const game: Game = GameMapper.toDomain(createGameDTO);
      const gameCreated = await this.gameRepository.create(game);
      return gameCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
