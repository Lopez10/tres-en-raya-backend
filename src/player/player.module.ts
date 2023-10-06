import { Module } from '@nestjs/common';
import { PlayerRepository } from './core/player.repository';
import { PlayerMongoRepository } from './infrastructure/repository/player.mongo.repository';
import { CreatePlayer } from './application/useCase/createPlayer.useCase';

@Module({
  controllers: [],
  providers: [
    {
      provide: PlayerRepository,
      useClass: PlayerMongoRepository,
    },
    CreatePlayer,
  ],
})
export class PlayerModule {}
