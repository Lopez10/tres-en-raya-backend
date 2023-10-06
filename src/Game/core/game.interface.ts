import { GameStatus } from '@prisma/client';

export interface Game {
  id: string;
  status: GameStatus;
  board: string[];
  playerId: string;
}
