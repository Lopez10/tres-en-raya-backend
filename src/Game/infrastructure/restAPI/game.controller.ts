import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateGame,
  CreateGameDTO,
} from '../../application/useCase/createGame.useCase';
import { GameMongoRepository } from '../repository/game.mongo.repository';

@Controller('game')
export class GameController {
  constructor(
    @Inject(GameMongoRepository)
    private readonly gameMongoRepository: GameMongoRepository,
  ) {}
  @Post()
  async createGame(@Body() game: CreateGameDTO): Promise<boolean> {
    const createGameUseCase = new CreateGame(this.gameMongoRepository);
    return createGameUseCase.run(game);
  }
}
