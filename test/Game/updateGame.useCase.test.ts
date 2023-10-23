import { UpdateGameUseCase } from '../../src/game/application/useCase/updateGame.useCase';
import { GameMockRepository } from './repository/game.mock.repository';
import { ID } from '../../src/common/valueObjects/ID.valueObject';
import { Game } from '../../src/game/domain/game.entity';
import { GameDTO } from '../../src/game/game.mapper';
import { PlayerMockRepository } from '../player/repository/player.mock.repository';
import { Player } from '../../src/player/domain/player.entity';

describe('Update game', () => {
  it(`
        GIVEN a valid player
        AND a valid data game with the last move
        WHEN I update the game with the last move 
        THEN the board is updated with the last move 
        AND the game status is updated to FINISHED
        AND the player wins is updated to 1
    `, async () => {
    const gameRepository = new GameMockRepository();
    const playerRepository = new PlayerMockRepository();
    const updateGame = new UpdateGameUseCase(gameRepository, playerRepository);

    // GIVEN
    playerRepository.create(
      Player.create(
        {
          username: 'username1',
          draws: 0,
          losses: 0,
          wins: 0,
        },
        new ID('player1'),
      ),
    );

    // AND
    gameRepository.create(
      Game.create(
        {
          status: 'IN_PROGRESS',
          turn: 'player1',
          board: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', ''],
          playerId: 'player1',
          username: 'username1',
          winner: null,
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
      username: 'username1',
      winner: null,
    };
    await updateGame.run(gameDTO);

    // THEN
    const gameUpdated = await gameRepository.findById(gameDTO.id);

    expect(gameUpdated.getPropsCopy().board).toEqual(gameDTO.board);

    // AND
    expect(gameUpdated.getPropsCopy().status).toEqual('FINISHED');

    // AND
    const playerUpdated = await playerRepository.findById('player1');
    expect(playerUpdated.getPropsCopy().wins).toEqual(1);
  });
});
