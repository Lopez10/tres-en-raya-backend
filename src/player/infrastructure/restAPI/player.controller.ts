import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { PlayerMongoRepository } from '../repository/player.mongo.repository';
import {
  CreatePlayerDTO,
  CreatePlayerUseCase,
} from 'src/player/application/useCase/createPlayer.useCase';
import { PlayerDTO, PlayerMapper } from 'src/player/player.mapper';
import { GetRankingUseCase } from 'src/player/application/useCase/getRanking.useCase';
import {
  UpdateRankingDTO,
  UpdateRankingUseCase,
} from 'src/player/application/useCase/updateRanking.useCase';

@Controller('players')
export class PlayerController {
  constructor(
    @Inject(PlayerMongoRepository)
    private readonly playerRepository: PlayerMongoRepository,
  ) {}

  @Post()
  async create(@Body() createPlayerDTO: CreatePlayerDTO): Promise<PlayerDTO> {
    const createPlayerUseCase = new CreatePlayerUseCase(this.playerRepository);
    const playerCreated = await createPlayerUseCase.run(createPlayerDTO);
    const playerDTO = PlayerMapper.toPersistence(playerCreated);

    return playerDTO;
  }

  @Get(':username')
  async getPlayer(@Param('username') username: string): Promise<PlayerDTO> {
    const getRankingUseCase = new GetRankingUseCase(this.playerRepository);
    const player = await getRankingUseCase.run(username);
    const playerDTO = PlayerMapper.toPersistence(player);

    return playerDTO;
  }

  @Post('/update-ranking')
  async updateRanking(
    @Body() updateRankingDTO: UpdateRankingDTO,
  ): Promise<PlayerDTO> {
    const updateRankingUseCase = new UpdateRankingUseCase(
      this.playerRepository,
    );
    const player = await updateRankingUseCase.run(updateRankingDTO);
    const playerDTO = PlayerMapper.toPersistence(player);

    return playerDTO;
  }
}
