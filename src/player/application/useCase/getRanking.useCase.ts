import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../common/useCase.base';
import { Player } from '../../domain/player.entity';
import { PlayerRepository } from '../../domain/player.repository';

@Injectable()
export class GetRankingUseCase implements UseCase<string, Promise<Player>> {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(username: string): Promise<Player> {
    try {
      const player = await this.playerRepository.findByUsername(username);
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }
}
