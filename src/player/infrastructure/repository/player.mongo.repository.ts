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

  findById(id: string): Promise<Player> {
    throw new Error('Method not implemented.');
  }
  create(entity: Player): Promise<Player> {
    throw new Error('Method not implemented.');
  }
}
