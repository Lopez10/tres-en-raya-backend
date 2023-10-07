import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateGame,
  CreateGameDTO,
} from '../../application/useCase/createGame.useCase';
import { GameMongoRepository } from '../repository/game.mongo.repository';
import { Game } from 'src/game/core/game.interface';

@Controller('games')
export class GameController {
  constructor(
    @Inject(GameMongoRepository)
    private readonly gameMongoRepository: GameMongoRepository,
  ) {}

  @Post()
  async createGame(@Body() createGameDTO: CreateGameDTO): Promise<Game> {
    const createGameUseCase = new CreateGame(this.gameMongoRepository);
    const game = await createGameUseCase.run(createGameDTO);

    return game;
  }
}
