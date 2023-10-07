import { GetRankingUseCase } from '../../src/player/application/useCase/getRanking.useCase';
import { PlayerMockRepository } from './player.mock.repository';
import { PlayerRepository } from '../../src/player/domain/player.repository';
import { Player } from '../../src/player/domain/player.entity';

describe('Get ranking', () => {
  it(`
    GIVEN a ranking of player with username "test"
    WHEN I get the ranking of the "test" player
    THEN the ranking of the "test" player is returned
  `, async () => {
    const playerRepository = new PlayerMockRepository();
    const getRanking = new GetRankingUseCase(playerRepository);
    addPlayerToRepository(playerRepository);

    // GIVEN
    const username = 'test';

    // WHEN
    const playerDTO = await getRanking.run(username);

    // THEN
    expect(playerDTO.getPropsCopy().username).toEqual(username);
    expect(playerDTO.getPropsCopy().wins).toEqual(0);
    expect(playerDTO.getPropsCopy().losses).toEqual(0);
    expect(playerDTO.getPropsCopy().draws).toEqual(0);
  });
});

function addPlayerToRepository(playerRepository: PlayerRepository) {
  playerRepository.create(
    Player.create({
      username: 'test',
      wins: 0,
      losses: 0,
      draws: 0,
    }),
  );
}
