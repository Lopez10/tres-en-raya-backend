import { Module } from '@nestjs/common';
import { GameController } from './infrastructure/restAPI/game.controller';
import { GameMongoRepository } from './infrastructure/repository/game.mongo.repository';
import { GameRepository } from './core/game.repository';
import { CreateGame } from './application/useCase/createGame.useCase';

@Module({
  controllers: [GameController],
  providers: [
    GameController,
    GameMongoRepository,

    {
      provide: GameRepository,
      useClass: GameMongoRepository,
    },
    CreateGame,
  ],
})
export class GameModule {}
