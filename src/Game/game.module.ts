import { Module } from '@nestjs/common';
import { GameController } from './infrastructure/restAPI/game.controller';
import { GameMongoRepository } from './infrastructure/repository/game.mongo.repository';
import { GameRepository } from './domain/game.repository';
import { CreateGameUseCase } from './application/useCase/createGame.useCase';

@Module({
  controllers: [GameController],
  providers: [
    GameController,
    GameMongoRepository,

    {
      provide: GameRepository,
      useClass: GameMongoRepository,
    },
    CreateGameUseCase,
  ],
})
export class GameModule {}
