import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { CreateAUserCommand } from './create-a-user.command';
import { UserInterface, UserModel } from '../../../../domain/model/user/user.model';
import { UserFactory } from '../../../../domain/factory/user.factory';
import { CreateAUserCommandHandlerException } from './create-a-user.command.handler.exception';

export class CreateAUserCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: UserCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: UserCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(command: CreateAUserCommand): Promise<UserInterface> {
    try {
      const user: UserInterface = new UserFactory(new UserModel()).generate(
        command.uuid,
        1,
        command.email,
        command.password,
        'saltToChange',
        new Date(),
        'c9f63e25-bd06-42ae-993c-20b6b236cb84',
        new Date(),
        'c9f63e25-bd06-42ae-993c-20b6b236cb84',
      );
      const userEntity: UserInterface = await this._repository.create(user);
      this._logger.info(`CreateAUserCommandHandler - User ${user.uuid} created`);

      return userEntity;
    } catch (e) {
      const message: string = `CreateAUserCommandHandler - User creation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAUserCommandHandlerException(message);
    }
  }
}
