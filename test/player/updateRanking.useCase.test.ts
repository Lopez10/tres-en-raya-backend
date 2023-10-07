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
      wins: 1,
    };
    const playerDTO = await updateRanking.run(updateRankingDTO);
    // THEN
    expect(playerDTO.getPropsCopy().username).toEqual(username);
    expect(playerDTO.getPropsCopy().wins).toEqual(1);
    expect(playerDTO.getPropsCopy().losses).toEqual(0);
    expect(playerDTO.getPropsCopy().draws).toEqual(0);
  });
});
