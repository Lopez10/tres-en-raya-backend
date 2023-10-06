import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameMongoRepository } from './game.mongo.repository';
import { GameRepositoryInterface } from './game.repository.interface';

@Module({
  controllers: [GameController],
  providers: [
    {
      provide: GameRepositoryInterface,
      useClass: GameMongoRepository,
    },
  ],
})
export class GameModule {}
