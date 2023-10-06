import { PrismaClient, Game as GameModel } from '@prisma/client';
import { Game } from '../../core/game.interface';
import { GameRepository } from '../../core/game.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameMongoRepository implements GameRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(game: Game): Promise<Game> {
    const gameCreated = await this.prisma.game.create({ data: game });

    return gameCreated;
  }

  async findById(id: string): Promise<Game | undefined> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return undefined;

    return game;
  }
}
