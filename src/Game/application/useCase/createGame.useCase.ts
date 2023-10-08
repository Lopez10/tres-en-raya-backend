import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';
import { GameDTO, GameMapper } from '../../game.mapper';

@Injectable()
export class CreateGameUseCase implements UseCase<GameDTO, Promise<Game>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(createGameDTO: GameDTO): Promise<Game> {
    try {
      const game: Game = GameMapper.toDomain(createGameDTO);
      await this.gameRepository.create(game);

      return game;
    } catch (error) {
      throw new Error(error);
    }
  }
}
