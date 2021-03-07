import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { CreateAUserCommand } from './create-a-user.command';
import { CreateAUserCommandHandler } from './create-a-user.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger.interface';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
export const EMAIL = 'notme@unknow.com';
export const PASSWORD = 'changeme';

describe('create a user handler test', () => {
  it ('create a user success', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const repository: UserCommandRepositoryInterface = {
      create(user: UserInterface): Promise<UserInterface> {
        return Promise.resolve(user);
      },
      update: jest.fn(),
      delete: jest.fn(),
    };
    const command = new CreateAUserCommand(UUID, EMAIL, PASSWORD);
    const handler = new CreateAUserCommandHandler(repository, logger);
    const user: UserInterface = await handler.handle(command);
    expect(user.uuid).toBe(UUID);
    expect(user.status).toBe(1);
    expect(user.email).toBe(EMAIL);
    expect(user.password).toBe(PASSWORD);
    expect(user.salt).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.createdBy).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedBy).toBeDefined();
  });

  it('create a user error', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const repository: UserCommandRepositoryInterface = {
      create(user: UserInterface): Promise<UserInterface> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
      update: jest.fn(),
      delete: jest.fn(),
    };
    const command = new CreateAUserCommand('', '', '');
    const handler = new CreateAUserCommandHandler(repository, logger);
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e.message).toEqual('CreateAUserCommandHandler - User creation error: Repository error');
    }
  });
});
