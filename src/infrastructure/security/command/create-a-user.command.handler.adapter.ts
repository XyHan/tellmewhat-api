import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger.interface';
import { CreateAUserCommandHandler } from '../../../application/command/user/create/create-a-user.command.handler';
import { CreateAUserCommand } from '../../../application/command/user/create/create-a-user.command';
import { UserCommandRepositoryInterface } from '../../../domain/repository/user/user.command-repository.interface';
import { UserCommandRepository } from '../repository/user.command-repository';
import { BcryptAdapter } from '../adapter/bcrypt.adapter';
import { EncrypterInterface } from '../../../domain/utils/encrypter.interface';

@CommandHandler(CreateAUserCommand)
export class CreateAUserCommandHandlerAdapter extends CreateAUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(UserCommandRepository) repository: UserCommandRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
    @Inject(BcryptAdapter) encrypter: EncrypterInterface
  ) {
    super(repository, logger, encrypter);
  }

  async execute(command: CreateAUserCommand): Promise<void> {
    return await this.handle(command);
  }
}
