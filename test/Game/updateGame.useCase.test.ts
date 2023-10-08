import { UpdateGameUseCase } from '../../src/game/application/useCase/updateGame.useCase';
import { GameMockRepository } from './repository/game.mock.repository';
import { ID } from '../../src/common/valueObjects/ID.valueObject';
import { Game } from '../../src/game/domain/game.entity';
import { GameDTO } from '../../src/game/game.mapper';

describe('Update game', () => {
  it(`
        GIVEN a valid data game with the last move
        WHEN I update the game with the last move 
        THEN the board is updated with the last move 
        AND the game status is updated to FINISHED
    `, async () => {
    const gameRepository = new GameMockRepository();
    const updateGame = new UpdateGameUseCase(gameRepository);

    // GIVEN
    gameRepository.create(
      Game.create(
        {
          status: 'IN_PROGRESS',
          turn: 'player1',
          board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', ''],
          playerId: 'player1',
        },
        new ID('123'),
      ),
    );

    // WHEN
    const gameDTO: GameDTO = {
      id: '123',
      status: 'IN_PROGRESS',
      turn: 'player1',
      board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
      playerId: 'player1',
    };
    await updateGame.run(gameDTO);

    // THEN
    const gameID = new ID(gameDTO.id);
    const gameUpdated = await gameRepository.findById(gameID);

    expect(gameUpdated.getPropsCopy().board).toEqual(gameDTO.board);

    // AND
    expect(gameUpdated.getPropsCopy().status).toEqual('FINISHED');
  });
});
