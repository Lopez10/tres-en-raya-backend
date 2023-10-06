export interface Game {
  id: string;
  status: GameStatus;
  board: string[];
  playerId: string;
}

export enum GameStatus {
  IN_PROGRES = 'IN_PROGRES',
  FINISHED = 'FINISHED',
}
