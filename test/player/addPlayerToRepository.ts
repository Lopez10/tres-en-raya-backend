import { PlayerRepository } from '../../src/player/domain/player.repository';
import { Player } from '../../src/player/domain/player.entity';

export function addPlayerToRepository(playerRepository: PlayerRepository) {
  playerRepository.create(
    Player.create({
      username: 'test',
      wins: 0,
      losses: 0,
      draws: 0,
    }),
  );
}
