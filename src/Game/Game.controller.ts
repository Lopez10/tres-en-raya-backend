import { Body, Controller, Post } from '@nestjs/common';
import { GameRepositoryInterface } from './Game.repository.interface';
import { GameMongoRepository } from './Game.mongo.repository';
import { Game } from './Game.interface';

@Controller('game')
export class GameController {
  private gameRepository: GameRepositoryInterface;
  constructor() {
    this.gameRepository = new GameMongoRepository();
  }

  @Post()
  async createGame(@Body() game: Game): Promise<void> {
    try {
      await this.gameRepository.insert(game);
    } catch (error) {
      throw error;
    }
  }
}
