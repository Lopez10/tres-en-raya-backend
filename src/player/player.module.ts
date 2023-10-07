import { Module } from '@nestjs/common';
import { PlayerRepository } from './domain/player.repository';
import { PlayerMongoRepository } from './infrastructure/repository/player.mongo.repository';
import { CreatePlayerUseCase } from './application/useCase/createPlayer.useCase';
import { PlayerController } from './infrastructure/restAPI/player.controller';
import { GetRankingUseCase } from './application/useCase/getRanking.useCase';
import { UpdateRankingUseCase } from './application/useCase/updateRanking.useCase';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerController,
    PlayerMongoRepository,

    {
      provide: PlayerRepository,
      useClass: PlayerMongoRepository,
    },
    CreatePlayerUseCase,
    GetRankingUseCase,
    UpdateRankingUseCase,
  ],
})
export class PlayerModule {}
