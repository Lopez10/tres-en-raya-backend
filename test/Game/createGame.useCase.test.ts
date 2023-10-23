import { GameMockRepository } from './repository/game.mock.repository';
import {
  CreateGameDTO,
  CreateGameUseCase,
} from '../../src/game/application/useCase/createGame.useCase';

describe('Create game', () => {
  it(`
    GIVEN a playerId to create an empty game
    WHEN an empty game is created
    THEN the game is saved in the database 
    AND the playerId is the same
  `, async () => {
    // GIVEN
    const createGameDTO: CreateGameDTO = {
      playerId: '123',
      username: 'username1',
    };

    // WHEN
    const gameRepository = new GameMockRepository();
    const createGame = new CreateGameUseCase(gameRepository);
    const gameCreated = await createGame.run(createGameDTO);

    // THEN
    const gameSaved = await gameRepository.findById(
      gameCreated.getPropsCopy().id.value,
    );
    expect(gameSaved).not.toBeUndefined();

    // AND
    expect(gameSaved.getPropsCopy().username).toEqual(createGameDTO.username);
  });
});
