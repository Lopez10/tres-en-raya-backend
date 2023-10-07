import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/useCase.base';
import { Player } from 'src/player/core/player.interface';
import { PlayerRepository } from 'src/player/core/player.repository';

@Injectable()
export class CreatePlayer implements UseCase<Player, Promise<Player>> {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(player: Player): Promise<Player> {
    try {
      const playerCreated = await this.playerRepository.create(player);
      return playerCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
