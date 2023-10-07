import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../../domain/game.repository';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';
import { GameDTO, GameMapper } from '../../game.mapper';

@Injectable()
export class CreateGameUseCase implements UseCase<GameDTO, Promise<void>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,
  ) {}
  async run(createGameDTO: GameDTO): Promise<void> {
    try {
      const game: Game = GameMapper.toDomain(createGameDTO);
      const gameCreated = await this.gameRepository.create(game);
      return gameCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
