export interface Game {
  id: string;
  status: GameStatus;
  board: string[][];
  player: string;
}

enum GameStatus {
  IN_PROGRES = 'IN_PROGRES',
  FINISHED = 'FINISHED',
}
