import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GameRepositoryInterface } from './game.repository.interface';
import { Game } from './game.interface';

@Controller('game')
export class GameController {
  constructor(
    @Inject(GameRepositoryInterface)
    private readonly gameRepository: GameRepositoryInterface,
  ) {}

  @Post()
  async createGame(@Body() game: Game): Promise<void> {
    try {
      await this.gameRepository.insert(game);
    } catch (error) {
      throw error;
    }
  }
}
