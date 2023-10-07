import { Repository } from 'src/common/repository.base';
import { Player } from './player.entity';

export type PlayerRepository = Repository<Player>;

export const PlayerRepository = Symbol('PlayerRepository');
