export interface Game {
  id: string;
  status: GameStatusEnum;
  turn: string;
  board: string[];
  playerId: string;
}

export enum GameStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}
