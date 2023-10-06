import { Body, Controller, Post } from '@nestjs/common';
import { Game } from './game.interface';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() game: Game): Promise<void> {
    this.gameService.createGame(game);
  }
}
