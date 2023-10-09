import { Module } from '@nestjs/common';
import { GameController } from './infrastructure/restAPI/game.controller';
import { GameMongoRepository } from './infrastructure/repository/game.mongo.repository';
import { GameRepository } from './domain/game.repository';
import { CreateGameUseCase } from './application/useCase/createGame.useCase';
import { UpdateGameUseCase } from './application/useCase/updateGame.useCase';
import { PlayerMongoRepository } from 'src/player/infrastructure/repository/player.mongo.repository';
import { PlayerRepository } from 'src/player/domain/player.repository';

@Module({
  controllers: [GameController],
  providers: [
    GameController,
    GameMongoRepository,
    PlayerMongoRepository,
    {
      provide: PlayerRepository,
      useClass: PlayerMongoRepository,
    },
    {
      provide: GameRepository,
      useClass: GameMongoRepository,
    },
    CreateGameUseCase,
    UpdateGameUseCase,
  ],
})
export class GameModule {}
