import { UserInterface, UserModel } from '../../../../domain/model/user/user.model';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { DeleteAUserCommand } from './delete-a-user.command';
import { DeleteAUserCommandHandler } from './delete-a-user.command.handler';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
export const STATUS = 2;
export const SUBJECT = 'Yoda';

describe('delete a user handler test', () => {
  it ('delete a user success', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const queryRepository: UserQueryRepositoryInterface = {
      findOneByUuid(uuid: string): Promise<UserInterface> {
        const user: UserInterface = new UserModel();
        user.uuid = uuid;
        return Promise.resolve(user);
      },
      findOneByEmail: jest.fn(),
    };
    const commandRepository: UserCommandRepositoryInterface = {
      delete(user: UserInterface): Promise<UserInterface> {
        return Promise.resolve(user);
      },
      create: jest.fn(),
      update: jest.fn(),
    };
    const command = new DeleteAUserCommand(UUID);
    const handler = new DeleteAUserCommandHandler(commandRepository, queryRepository, logger);
    const user: UserInterface = await handler.handle(command);
    expect(user.uuid).toBe(UUID);
  });

  it('delete a user error', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const queryRepository: UserQueryRepositoryInterface = {
      findOneByUuid(uuid: string): Promise<UserInterface> {
        const user: UserInterface = new UserModel();
        user.uuid = uuid;
        return Promise.resolve(user);
      },
      findOneByEmail: jest.fn(),
    };
    const commandRepository: UserCommandRepositoryInterface = {
      delete(user: UserInterface): Promise<UserInterface> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
      create: jest.fn(),
      update: jest.fn(),
    };
    const command = new DeleteAUserCommand('');
    const handler = new DeleteAUserCommandHandler(commandRepository, queryRepository, logger);
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e.message).toEqual('DeleteAUserCommandHandler - User deletion error: Repository error');
    }
  });
});
