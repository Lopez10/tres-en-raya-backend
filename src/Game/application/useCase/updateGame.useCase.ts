import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../common/useCase.base';
import { Game } from '../../domain/game.entity';
import { GameRepository } from '../../domain/game.repository';
import { GameDTO, GameMapper } from '../../game.mapper';
import { PlayerRepository } from 'src/player/domain/player.repository';

@Injectable()
export class UpdateGameUseCase implements UseCase<GameDTO, Promise<Game>> {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: GameRepository,

    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(gameDTO: GameDTO): Promise<Game> {
    try {
      const game: Game = GameMapper.toDomain(gameDTO);

      if (game.isFinished()) {
        throw new Error('The game is finished');
      }

      game.checksAndFinishTheGame();
      game.moveIAAlgorithm();

      const gameUpdated = await this.gameRepository.update(game);

      if (game.isFinished()) {
        const stateOfGame = game.getStateFinishedGame();
        const player = await this.playerRepository.findById(
          gameUpdated.getPropsCopy().playerId,
        );
        player.updateRanking(stateOfGame);
        this.playerRepository.update(player);
      }

      return gameUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
