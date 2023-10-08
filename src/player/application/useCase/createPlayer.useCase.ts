import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/useCase.base';
import { Player } from 'src/player/domain/player.entity';
import { PlayerRepository } from 'src/player/domain/player.repository';

@Injectable()
export class CreatePlayerUseCase implements UseCase<string, Promise<Player>> {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async run(username: string): Promise<Player> {
    try {
      const playerFound = this.playerRepository.findByUsername(username);

      if (playerFound) {
        return playerFound;
      }

      const player = Player.create({
        username,
        wins: 0,
        draws: 0,
        losses: 0,
      });

      await this.playerRepository.create(player);
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }
}
