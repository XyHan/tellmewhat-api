import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { DeleteAUserCommandHandlerException } from './delete-a-user.command.handler.exception';
import { DeleteAUserCommand } from './delete-a-user.command';

export class DeleteAUserCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: UserCommandRepositoryInterface;
  protected readonly _queryRepository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: UserCommandRepositoryInterface,
    queryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  async handle(command: DeleteAUserCommand): Promise<void> {
    try {
      const user: UserInterface = await this.findOneUserByUuid(command.uuid);
      await this._commandRepository.delete(user);
      this._logger.info(`DeleteAUserCommandHandler - User ${user.uuid} deleted`);
    } catch (e) {
      const message: string = `DeleteAUserCommandHandler - User deletion error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAUserCommandHandlerException(message);
    }
  }

  private async findOneUserByUuid(uuid: string): Promise<UserInterface> {
    try {
      return await this._queryRepository.findOneByUuid(uuid);
    } catch (e) {
      throw new DeleteAUserCommandHandlerException(e.message);
    }
  }
}
