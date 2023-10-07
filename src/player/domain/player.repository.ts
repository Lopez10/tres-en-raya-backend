import { Repository } from 'src/common/repository.base';
import { Player } from './player.entity';

export interface PlayerRepository extends Repository<Player> {
  findByUsername(username: string): Promise<Player>;
}

export const PlayerRepository = Symbol('PlayerRepository');
