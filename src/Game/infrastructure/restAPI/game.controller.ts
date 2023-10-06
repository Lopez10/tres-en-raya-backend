import { Body, Controller, Post } from '@nestjs/common';
import { Game } from '../../core/game.interface';
import { CreateGame } from '../../application/useCase/createGame.useCase';

@Controller('game')
export class GameController {
  constructor(private readonly createGameUseCase: CreateGame) {}

  @Post()
  async createGame(@Body() game: Game): Promise<boolean> {
    return this.createGameUseCase.run(game);
  }
}
