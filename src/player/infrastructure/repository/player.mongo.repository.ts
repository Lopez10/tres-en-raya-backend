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

    return {
      id: playerCreated.id,
      username: playerCreated.username,
      wins: playerCreated.wins,
      losses: playerCreated.losses,
      draws: playerCreated.draws,
    };
  }

  findById(id: string): Promise<Player> {
    throw new Error('Method not implemented.');
  }
}
