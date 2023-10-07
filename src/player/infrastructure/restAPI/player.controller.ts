import { Controller, Post, Body, Inject } from '@nestjs/common';
import { PlayerMongoRepository } from '../repository/player.mongo.repository';
import { CreatePlayer } from 'src/player/application/useCase/createPlayer.useCase';
import { Player } from 'src/player/core/player.interface';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(PlayerMongoRepository)
    private readonly playerRepository: PlayerMongoRepository,
  ) {}

  @Post()
  async create(@Body() createPlayerDto: Player): Promise<Player> {
    const createPlayerUseCase = new CreatePlayer(this.playerRepository);
    const player = await createPlayerUseCase.run(createPlayerDto);

    return player;
  }
}
