import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { TicketCommandRepositoryInterface } from '../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../repository/ticket/ticket.command-repository';
import { TicketQueryRepository } from '../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';
import { DeleteATicketCommand } from '../../../application/command/ticket/delete/delete-a-ticket.command';
import { DeleteATicketCommandHandler } from '../../../application/command/ticket/delete/delete-a-ticket.command.handler';

@CommandHandler(DeleteATicketCommand)
export class DeleteATicketCommandHandlerAdapter extends DeleteATicketCommandHandler implements ICommandHandler {
  constructor(
    @Inject(TicketCommandRepository) commandRepository: TicketCommandRepositoryInterface,
    @Inject(TicketQueryRepository) queryRepository: TicketQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(commandRepository, queryRepository, logger);
  }

  async execute(command: DeleteATicketCommand): Promise<void> {
    return await this.handle(command);
  }
}
