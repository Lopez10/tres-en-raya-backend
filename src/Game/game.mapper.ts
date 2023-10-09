import { ID } from '../common/valueObjects/ID.valueObject';
import { Game } from './domain/game.entity';
import { Game as GameModel } from '@prisma/client';

export interface GameDTO {
  id: string;
  status: 'IN_PROGRESS' | 'FINISHED';
  turn: string;
  board: string[];
  playerId: string;
  winner: string;
}

export class GameMapper {
  static toDomain(game: GameDTO | GameModel): Game {
    return Game.create(
      {
        status: game.status as 'IN_PROGRESS' | 'FINISHED',
        turn: game.turn,
        board: game.board,
        playerId: game.playerId,
        winner: game.winner,
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
      winner: game.getPropsCopy().winner,
    };
  }
}
