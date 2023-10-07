import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../common/useCase.base';
import { Player } from '../../domain/player.entity';
import { PlayerRepository } from '../../domain/player.repository';

export interface UpdateRankingDTO {
  username: string;
  result: 'WIN' | 'LOST' | 'DRAW';
}

@Injectable()
export class UpdateRankingUseCase
  implements UseCase<UpdateRankingDTO, Promise<Player>>
{
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run({ username, result }: UpdateRankingDTO): Promise<Player> {
    try {
      const player = await this.playerRepository.findByUsername(username);

      if (!player) throw new Error('Player not found');

      player.updateRanking(result);

      const playerUpdated = this.playerRepository.update(player);

      return playerUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
