import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { DeleteAUserCommandHandler } from '../../../application/command/user/delete/delete-a-user.command.handler';
import { DeleteAUserCommand } from '../../../application/command/user/delete/delete-a-user.command';
import { UserCommandRepositoryInterface } from '../../../domain/repository/user/user.command-repository.interface';
import { UserCommandRepository } from '../repository/user.command-repository';
import { UserQueryRepositoryInterface } from '../../../domain/repository/user/user.query-repository.interface';
import { UserQueryRepository } from '../repository/user.query-repository';

@CommandHandler(DeleteAUserCommand)
export class DeleteAUserCommandHandlerAdapter extends DeleteAUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(UserCommandRepository) commandRepository: UserCommandRepositoryInterface,
    @Inject(UserQueryRepository) queryRepository: UserQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(commandRepository, queryRepository, logger);
  }

  async execute(command: DeleteAUserCommand): Promise<void> {
    return await this.handle(command);
  }
}
