import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Player } from 'src/player/core/player.interface';
import { PlayerRepository } from 'src/player/core/player.repository';

@Injectable()
export class PlayerMongoRepository implements PlayerRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(player: Player): Promise<Player> {
    const playerCreated = await this.prisma.player.create({ data: player });

    return playerCreated;
  }

  async findById(id: string): Promise<Player | undefined> {
    const player = this.prisma.player.findUnique({ where: { id } });

    if (!player) return undefined;

    return player;
  }
}
