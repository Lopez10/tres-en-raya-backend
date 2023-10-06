import { GameMockRepository } from './game.mock.repository';
import { Game, GameStatus } from '../../src/game/game.interface';
import { GameService } from '../../src/game/game.service';

describe('Game Service', () => {
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
    const gameService = new GameService(gameRepository);
    await gameService.createGame(game);

    // THEN
    const gameSaved = await gameRepository.findById(game.id);
    expect(gameSaved).toEqual(game);
  });
});
