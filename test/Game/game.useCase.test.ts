import { GameMockRepository } from './game.mock.repository';
import { Game, GameStatus } from '../../src/game/core/game.interface';
import { CreateGame } from '../../src/game/application/useCase/createGame.useCase';

describe('Create game', () => {
  it(`
    GIVEN a valid data game 
    WHEN I create the game with the data
    THEN the game is saved in the database
  `, async () => {
    // GIVEN
    const game: Game = {
      id: '123',
      status: 'IN_PROGRES' as GameStatus,
      board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
      playerId: '123',
    };
    // WHEN
    const gameRepository = new GameMockRepository();
    const createGame = new CreateGame(gameRepository);
    await createGame.run(game);

    // THEN
    const gameSaved = await gameRepository.findById(game.id);
    expect(gameSaved).toEqual(game);
  });
});
