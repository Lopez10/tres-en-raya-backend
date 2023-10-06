import { PrismaClient, Game as GameModel } from '@prisma/client';
import { Game } from './Game.interface';

export class GameRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(game: Game): Promise<void> {
    const data: GameModel = {
      id: game.id,
      status: game.status,
      board: game.board,
      playerId: game.player,
    };
    await this.prisma.game.create({ data });
  }
}
