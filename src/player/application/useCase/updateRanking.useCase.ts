import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../common/useCase.base';
import { Player } from '../../domain/player.entity';
import { PlayerRepository } from '../../domain/player.repository';

export interface UpdateRankingDTO {
  username: string;
  wins?: number;
  losses?: number;
  draws?: number;
}
@Injectable()
export class UpdateRankingUseCase
  implements UseCase<UpdateRankingDTO, Promise<Player>>
{
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(updateRankingDTO: UpdateRankingDTO): Promise<Player> {
    try {
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
