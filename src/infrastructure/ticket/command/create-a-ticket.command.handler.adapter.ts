import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { TicketInterface } from '../../../domain/model/ticket/ticket.model';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger.interface';
import { CreateATicketCommandHandler } from '../../../application/command/ticket/create/create-a-ticket.command.handler';
import { CreateATicketCommand } from '../../../application/command/ticket/create/create-a-ticket.command';
import { TicketCommandRepositoryInterface } from '../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../repository/ticket/ticket.command-repository';

@CommandHandler(CreateATicketCommand)
export class CreateATicketCommandHandlerAdapter extends CreateATicketCommandHandler implements ICommandHandler {
  constructor(
    @Inject(TicketCommandRepository) repository: TicketCommandRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(repository, logger);
  }

  async execute(command: CreateATicketCommand): Promise<TicketInterface> {
    return await this.handle(command);
  }
}
