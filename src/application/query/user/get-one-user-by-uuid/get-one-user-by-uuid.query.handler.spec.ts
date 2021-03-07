import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { LoggerMock } from '../../../../infrastructure/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface, UserModel } from '../../../../domain/model/user/user.model';
import { GetOneUserByUuidQuery } from './get-one-user-by-uuid.query';
import { GetOneUserByUuidQueryHandler } from './get-one-user-by-uuid.query.handler';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('get one user by uuid handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a user success', async () => {
    const repository: UserQueryRepositoryInterface = {
      findOneByUuid(uuid: string): Promise<UserInterface> {
        const user = new UserModel();
        user.uuid = UUID;
        return Promise.resolve(user);
      },
      findOneByEmail: jest.fn(),
    };
    const query = new GetOneUserByUuidQuery(UUID);
    const handler = new GetOneUserByUuidQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user.uuid).toEqual(UUID);
  });

  it('return a ticket error', async () => {
    const repository: UserQueryRepositoryInterface = {
      findOneByUuid(uuid: string): Promise<UserInterface> {
        const error: Error = new Error('Not found');
        return Promise.reject(error);
      },
      findOneByEmail: jest.fn(),
    };
    const query = new GetOneUserByUuidQuery(UUID);
    const handler = new GetOneUserByUuidQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('GetOneUserByUuidQueryHandler - User 31dd20e0-9a1d-4734-b0af-d9cc3aff4028 error: Not found');
    }
  });
});
