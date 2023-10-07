import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { PlayerMongoRepository } from '../repository/player.mongo.repository';
import { CreatePlayerUseCase } from 'src/player/application/useCase/createPlayer.useCase';
import { PlayerDTO, PlayerMapper } from 'src/player/player.mapper';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(PlayerMongoRepository)
    private readonly playerRepository: PlayerMongoRepository,
  ) {}

  @Post()
  async create(@Body() createPlayerDto: PlayerDTO): Promise<void> {
    const createPlayerUseCase = new CreatePlayerUseCase(this.playerRepository);
    await createPlayerUseCase.run(createPlayerDto);
  }

  @Get(':username')
  async getPlayer(@Param('username') username: string): Promise<PlayerDTO> {
    const player = await this.playerRepository.findByUsername(username);
    const playerDTO = PlayerMapper.toPersistence(player);

    return playerDTO;
  }
}
