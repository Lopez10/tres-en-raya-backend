import {
  UpdateRankingDTO,
  UpdateRankingUseCase,
} from '../../src/player/application/useCase/updateRanking.useCase';
import { addPlayerToRepository } from './addPlayerToRepository';
import { PlayerMockRepository } from './player.mock.repository';

describe('Update ranking', () => {
  it(`
        GIVEN a ranking of player with username "test" and 0 wins
        WHEN I update the ranking of the "test" player with 1 win
        THEN the ranking of the "test" player is updated
    `, async () => {
    // GIVEN
    const username = 'test';
    const playerRepository = new PlayerMockRepository();
    const updateRanking = new UpdateRankingUseCase(playerRepository);
    addPlayerToRepository(playerRepository);
    // WHEN
    const updateRankingDTO: UpdateRankingDTO = {
      username,
      result: 'WIN',
    };
    await updateRanking.run(updateRankingDTO);
    // THEN
    const playerUpdated = await playerRepository.findByUsername(username);
    expect(playerUpdated.getPropsCopy().username).toEqual(username);
    expect(playerUpdated.getPropsCopy().wins).toEqual(1);
    expect(playerUpdated.getPropsCopy().losses).toEqual(0);
    expect(playerUpdated.getPropsCopy().draws).toEqual(0);
  });
});
