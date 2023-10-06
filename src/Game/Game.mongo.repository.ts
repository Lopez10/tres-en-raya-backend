import { PrismaClient, Game as GameModel } from '@prisma/client';
import { Game, GameStatus } from './Game.interface';
import { GameRepositoryInterface } from './Game.repository.interface';

export class GameMongoRepository implements GameRepositoryInterface {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(game: Game): Promise<void> {
    const data: GameModel = {
      id: game.id,
      status: game.status,
      board: game.board,
      playerId: game.playerId,
    };
    await this.prisma.game.create({ data });
  }

  async findById(id: string): Promise<Game | undefined> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return undefined;
    return {
      id: game.id,
      status: game.status as GameStatus,
      board: game.board,
      playerId: game.playerId,
    };
  }
}
