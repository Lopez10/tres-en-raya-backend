import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateGameUseCase,
  CreateGameDTO,
} from '../../application/useCase/createGame.useCase';
import { GameMongoRepository } from '../repository/game.mongo.repository';

@Controller('games')
export class GameController {
  constructor(
    @Inject(GameMongoRepository)
    private readonly gameMongoRepository: GameMongoRepository,
  ) {}

  @Post()
  async createGame(@Body() createGameDTO: CreateGameDTO): Promise<void> {
    const createGameUseCase = new CreateGameUseCase(this.gameMongoRepository);
    await createGameUseCase.run(createGameDTO);
  }
}
