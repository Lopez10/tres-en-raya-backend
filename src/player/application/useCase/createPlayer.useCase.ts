import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/useCase.base';
import { Player } from 'src/player/domain/player.entity';
import { PlayerRepository } from 'src/player/domain/player.repository';
import { PlayerDTO } from 'src/player/player.mapper';

@Injectable()
export class CreatePlayer implements UseCase<PlayerDTO, Promise<void>> {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(player: PlayerDTO): Promise<void> {
    try {
      const playerDomain = Player.create(player);
      await this.playerRepository.create(playerDomain);
    } catch (error) {
      throw new Error(error);
    }
  }
}
