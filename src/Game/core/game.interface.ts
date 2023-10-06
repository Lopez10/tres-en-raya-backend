export interface Game {
  id: string;
  status: GameStatusEnum;
  board: string[];
  playerId: string;
}

export enum GameStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}
