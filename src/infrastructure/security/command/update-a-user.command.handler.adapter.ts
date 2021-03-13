import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { UpdateAUserCommandHandler } from '../../../application/command/user/update/update-a-user.command.handler';
import { UpdateAUserCommand } from '../../../application/command/user/update/update-a-user.command';
import { UserCommandRepositoryInterface } from '../../../domain/repository/user/user.command-repository.interface';
import { UserCommandRepository } from '../repository/user.command-repository';
import { UserQueryRepository } from '../repository/user.query-repository';
import { UserQueryRepositoryInterface } from '../../../domain/repository/user/user.query-repository.interface';

@CommandHandler(UpdateAUserCommand)
export class UpdateAUserCommandHandlerAdapter extends UpdateAUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(UserCommandRepository) commandRepository: UserCommandRepositoryInterface,
    @Inject(UserQueryRepository) queryRepository: UserQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(commandRepository, queryRepository, logger);
  }

  async execute(command: UpdateAUserCommand): Promise<void> {
    return await this.handle(command);
  }
}
