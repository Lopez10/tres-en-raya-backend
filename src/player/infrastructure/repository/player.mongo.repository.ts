import { Injectable } from '@nestjs/common';
import { PrismaClient, Player as PlayerModel } from '@prisma/client';
import { ID } from 'src/common/valueObjects/ID.valueObject';
import { Player } from 'src/player/domain/player.entity';
import { PlayerRepository } from 'src/player/domain/player.repository';
import { PlayerMapper } from 'src/player/player.mapper';

@Injectable()
export class PlayerMongoRepository implements PlayerRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entityPlayer: Player): Promise<void> {
    const player = PlayerMapper.toPersistence(entityPlayer);
    await this.prisma.player.create({ data: player });
  }

  async findById(id: string): Promise<Player | undefined> {
    const player: PlayerModel = await this.prisma.player.findUnique({
      where: { id },
    });

    if (!player) return undefined;

    const playerDomain = PlayerMapper.toDomain(player);

    return playerDomain;
  }

  async findByUsername(username: string): Promise<Player | undefined> {
    const player: PlayerModel = await this.prisma.player.findUnique({
      where: { username },
    });

    if (!player) return undefined;

    const playerDomain = PlayerMapper.toDomain(player);

    return playerDomain;
  }

  async update(player: Player): Promise<Player> {
    const { id, ...playerToUpdate } = PlayerMapper.toPersistence(player);
    const playerUpdated = await this.prisma.player.update({
      where: { id },
      data: playerToUpdate,
    });

    const playerDomain = PlayerMapper.toDomain(playerUpdated);

    return playerDomain;
  }
}
