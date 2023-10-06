import { Repository } from 'src/common/repository.base';
import { Player } from './player.interface';

export type PlayerRepository = Repository<Player>;

export const PlayerRepository = Symbol('PlayerRepository');
