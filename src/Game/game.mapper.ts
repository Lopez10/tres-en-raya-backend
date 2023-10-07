import { ID } from '../common/valueObjects/ID.valueObject';
import { Game } from './domain/game.entity';

export interface GameDTO {
  id: string;
  status: 'IN_PROGRESS' | 'FINISHED';
  turn: string;
  board: string[];
  playerId: string;
}

export class GameMapper {
  static toDomain(game: GameDTO) {
    return Game.create(
      {
        status: game.status,
        turn: game.turn,
        board: game.board,
        playerId: game.playerId,
      },
      new ID(game.id),
    );
  }
  static toPersistence(game: Game): GameDTO {
    return {
      id: game.getPropsCopy().id.value,
      status: game.getPropsCopy().status,
      turn: game.getPropsCopy().turn,
      board: game.getPropsCopy().board,
      playerId: game.getPropsCopy().playerId,
    };
  }
}
