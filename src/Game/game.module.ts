import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameMongoRepository } from './game.mongo.repository';
import { GameRepositoryInterface } from './game.repository.interface';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [
    {
      provide: GameRepositoryInterface,
      useClass: GameMongoRepository,
    },
    GameService,
  ],
})
export class GameModule {}
