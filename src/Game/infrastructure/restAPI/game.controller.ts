import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateGameUseCase } from '../../application/useCase/createGame.useCase';
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
  async createGame(@Body() createGameDTO: GameDTO): Promise<void> {
    const createGameUseCase = new CreateGameUseCase(this.gameMongoRepository);
    await createGameUseCase.run(createGameDTO);
  }

  @Post('/move')
  async move(@Body() gameDTO: GameDTO): Promise<GameDTO> {
    const updateGameUseCase = new UpdateGameUseCase(this.gameMongoRepository);
    const game = await updateGameUseCase.run(gameDTO);
    const updatedGameDTO = GameMapper.toPersistence(game);

    return updatedGameDTO;
  }
}
