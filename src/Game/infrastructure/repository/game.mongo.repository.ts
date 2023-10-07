import { PrismaClient, Game as GameModel } from '@prisma/client';
import { Game, GameStatusEnum } from '../../core/game.interface';
import { GameRepository } from '../../core/game.repository';
import { Injectable } from '@nestjs/common';
import { CreateGameDTO } from 'src/game/application/useCase/createGame.useCase';

@Injectable()
export class GameMongoRepository implements GameRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(game: CreateGameDTO): Promise<Game> {
    const gameCreated = await this.prisma.game.create({ data: game });

    return {
      id: gameCreated.id,
      status: gameCreated.status as GameStatusEnum,
      board: gameCreated.board,
      playerId: gameCreated.playerId,
    };
  }

  async findById(id: string): Promise<Game | undefined> {
    const game: GameModel = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return undefined;

    return {
      id: game.id,
      status: game.status as GameStatusEnum,
      board: game.board,
      playerId: game.playerId,
    };
  }
}
