import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateGameDTO,
  CreateGameUseCase,
} from '../../application/useCase/createGame.useCase';
import { GameMongoRepository } from '../repository/game.mongo.repository';
import { GameDTO, GameMapper } from 'src/game/game.mapper';
import { UpdateGameUseCase } from 'src/game/application/useCase/updateGame.useCase';

@Controller('games')
export class GameController {
  constructor(
    @Inject(GameMongoRepository)
    private readonly gameMongoRepository: GameMongoRepository,
  ) {}

  @Post()
  async createGame(@Body() createGameDTO: CreateGameDTO): Promise<GameDTO> {
    const createGameUseCase = new CreateGameUseCase(this.gameMongoRepository);
    const gameCreated = await createGameUseCase.run(createGameDTO);
    const gameDTO = GameMapper.toPersistence(gameCreated);

    return gameDTO;
  }

  @Post('/move')
  async move(@Body() gameDTO: GameDTO): Promise<GameDTO> {
    const updateGameUseCase = new UpdateGameUseCase(this.gameMongoRepository);
    const game = await updateGameUseCase.run(gameDTO);
    const updatedGameDTO = GameMapper.toPersistence(game);

    return updatedGameDTO;
  }
}
