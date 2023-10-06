import { Module } from '@nestjs/common';
import { GameController } from './infrastructure/restAPI/game.controller';
import { GameMongoRepository } from './infrastructure/repository/game.mongo.repository';
import { GameRepositoryInterface } from './game.repository.interface';
import { CreateGame } from './application/useCase/createGame.useCase';

@Module({
  controllers: [GameController],
  providers: [
    {
      provide: GameRepositoryInterface,
      useClass: GameMongoRepository,
    },
    CreateGame,
  ],
})
export class GameModule {}
