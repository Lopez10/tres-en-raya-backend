import { Module } from '@nestjs/common';
import { PlayerRepository } from './domain/player.repository';
import { PlayerMongoRepository } from './infrastructure/repository/player.mongo.repository';
import { CreatePlayer } from './application/useCase/createPlayer.useCase';
import { PlayerController } from './infrastructure/restAPI/player.controller';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerController,
    PlayerMongoRepository,

    {
      provide: PlayerRepository,
      useClass: PlayerMongoRepository,
    },
    CreatePlayer,
  ],
})
export class PlayerModule {}
