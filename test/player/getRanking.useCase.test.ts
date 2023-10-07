import { GetRankingUseCase } from '../../src/player/application/useCase/getRanking.useCase';
import { PlayerMockRepository } from './player.mock.repository';
import { addPlayerToRepository } from './addPlayerToRepository';

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
