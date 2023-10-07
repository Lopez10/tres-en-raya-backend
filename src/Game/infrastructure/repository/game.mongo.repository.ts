import { PrismaClient, Game as GameModel } from '@prisma/client';
import { GameRepository } from '../../domain/game.repository';
import { Injectable } from '@nestjs/common';
import { GameMapper } from 'src/game/game.mapper';
import { Game } from 'src/game/domain/game.entity';

@Injectable()
export class GameMongoRepository implements GameRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(gameEntity: Game): Promise<void> {
    const gameDTO = GameMapper.toPersistence(gameEntity);
    await this.prisma.game.create({ data: gameDTO });
  }

  async findById(id: string): Promise<Game | undefined> {
    const game: GameModel = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) return undefined;

    return GameMapper.toDomain(game);
  }
}
