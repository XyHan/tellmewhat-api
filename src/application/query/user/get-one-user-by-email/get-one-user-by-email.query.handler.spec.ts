import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { LoggerMock } from '../../../../infrastructure/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface, UserModel } from '../../../../domain/model/user/user.model';
import { GetOneUserByEmailQuery } from './get-one-user-by-email.query';
import { GetOneUserByEmailQueryHandler } from './get-one-user-by-email.query.handler';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
export const EMAIL = 'notme@unknow.com';

describe('get one user by email handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a user success', async () => {
    const repository: UserQueryRepositoryInterface = {
      findOneByEmail(email: string): Promise<UserInterface> {
        const user = new UserModel();
        user.uuid = UUID;
        user.email = EMAIL;
        return Promise.resolve(user);
      },
      findOneByUuid: jest.fn(),
    };
    const query = new GetOneUserByEmailQuery(EMAIL);
    const handler = new GetOneUserByEmailQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user.uuid).toEqual(UUID);
  });

  it('return a ticket error', async () => {
    const repository: UserQueryRepositoryInterface = {
      findOneByEmail(email: string): Promise<UserInterface> {
        const error: Error = new Error('Not found');
        return Promise.reject(error);
      },
      findOneByUuid: jest.fn(),
    };
    const query = new GetOneUserByEmailQuery(EMAIL);
    const handler = new GetOneUserByEmailQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual(`GetOneUserByEmailQueryHandler - User ${EMAIL} error: Not found`);
    }
  });
});
