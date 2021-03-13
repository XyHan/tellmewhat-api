import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UpdateAUserCommandHandlerException } from './update-a-user.command.handler.exception';
import { UpdateAUserCommand } from './update-a-user.command';
import { UserFactory } from '../../../../domain/factory/user.factory';

export class UpdateAUserCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: UserCommandRepositoryInterface;
  protected readonly _queryRepository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: UserCommandRepositoryInterface,
    queryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface,
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  public async handle(command: UpdateAUserCommand): Promise<void> {
    const user: UserInterface = await this.findOneUserByUuid(command.uuid);
    const updatedUser: UserInterface = await this.updateUserFromCommand(command, user);
    await this.saveUpdatedUser(updatedUser);
    this._logger.info(`UpdateAUserCommandHandler - User ${user.uuid} updated`);
  }

  private async updateUserFromCommand(command: UpdateAUserCommand, user: UserInterface): Promise<UserInterface> {
    try {
      return new UserFactory(user).generate(
        command.uuid,
        command.status,
        command.email,
        user.password,
        user.salt,
        user.createdAt,
        user.createdBy,
        user.updatedAt,
        user.updatedBy,
      );
    } catch (e) {
      const message: string = `UpdateAUserCommandHandler - updateUserFromCommand - User update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateAUserCommandHandlerException(message);
    }
  }

  private async saveUpdatedUser(user: UserInterface): Promise<void> {
    try {
      await this._commandRepository.update(user);
      this._logger.info(`UpdateAUserCommandHandler - User ${user.uuid} updated`);
    } catch (e) {
      const message: string = `UpdateAUserCommandHandler - saveUpdatedUser - User update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateAUserCommandHandlerException(message);
    }
  }

  private async findOneUserByUuid(uuid: string): Promise<UserInterface> {
    try {
      return await this._queryRepository.findOneByUuid(uuid);
    } catch (e) {
      throw new UpdateAUserCommandHandlerException(e.message);
    }
  }
}
