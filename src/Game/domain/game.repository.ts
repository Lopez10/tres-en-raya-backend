import { Repository } from 'src/common/repository.base';
import { Game } from './game.entity';

export type GameRepository = Repository<Game>;

export const GameRepository = Symbol('GameRepository');
