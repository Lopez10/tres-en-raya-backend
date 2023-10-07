import { Module } from '@nestjs/common';
import { GameController } from './infrastructure/restAPI/game.controller';
import { GameMongoRepository } from './infrastructure/repository/game.mongo.repository';
import { GameRepository } from './domain/game.repository';
import { CreateGameUseCase } from './application/useCase/createGame.useCase';
import { UpdateGameUseCase } from './application/useCase/updateGame.useCase';

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
    UpdateGameUseCase,
  ],
})
export class GameModule {}
