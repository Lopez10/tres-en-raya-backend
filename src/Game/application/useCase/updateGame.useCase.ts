import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';
import { GameRepository } from '../../domain/game.repository';
import { GameDTO, GameMapper } from '../../game.mapper';

@Injectable()
export class UpdateGameUseCase implements UseCase<GameDTO, Promise<Game>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(gameDTO: GameDTO): Promise<Game> {
    try {
      const game: Game = GameMapper.toDomain(gameDTO);
      // If it is not the last move (check the board)
      // Add IA algorithm here to do the move
      const gameUpdated = await this.gameRepository.update(game);
      return gameUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
