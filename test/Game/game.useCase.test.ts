import { GameMockRepository } from './game.mock.repository';
import {
  CreateGame,
  CreateGameDTO,
} from '../../src/game/application/useCase/createGame.useCase';
import { ID } from '../../src/common/valueObjects/ID.valueObject';

describe('Create game', () => {
  it(`
    GIVEN a valid data game 
    WHEN I create the game with the data
    THEN the game is saved in the database
  `, async () => {
    // GIVEN
    const game: CreateGameDTO = {
      id: '123',
      status: 'IN_PROGRESS',
      turn: '123',
      board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
      playerId: '123',
    };
    // WHEN
    const gameRepository = new GameMockRepository();
    const createGame = new CreateGame(gameRepository);
    await createGame.run(game);

    // THEN
    const gameID = new ID(game.id);
    const gameSaved = await gameRepository.findById(gameID);

    expect(gameSaved.getPropsCopy().board).toEqual(game.board);
    expect(gameSaved.getPropsCopy().status).toEqual(game.status);
    expect(gameSaved.getPropsCopy().turn).toEqual(game.turn);
    expect(gameSaved.getPropsCopy().playerId).toEqual(game.playerId);
    expect(gameSaved.getPropsCopy().id.value).toEqual(game.id);
  });
});
