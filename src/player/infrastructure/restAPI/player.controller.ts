import { Controller, Post, Body, Inject } from '@nestjs/common';
import { PlayerMongoRepository } from '../repository/player.mongo.repository';
import { CreatePlayer } from 'src/player/application/useCase/createPlayer.useCase';
import { PlayerDTO } from 'src/player/player.mapper';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(PlayerMongoRepository)
    private readonly playerRepository: PlayerMongoRepository,
  ) {}

  @Post()
  async create(@Body() createPlayerDto: PlayerDTO): Promise<void> {
    const createPlayerUseCase = new CreatePlayer(this.playerRepository);
    await createPlayerUseCase.run(createPlayerDto);
  }
}
