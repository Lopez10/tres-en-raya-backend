import { Body, Controller, Post } from '@nestjs/common';
import { GameRepositoryInterface } from './Game.repository.interface';
import { Game } from './Game.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameRepository: GameRepositoryInterface) {}

  @Post()
  async createGame(@Body() game: Game): Promise<void> {
    try {
      await this.gameRepository.insert(game);
    } catch (error) {
      throw error;
    }
  }
}
