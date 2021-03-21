import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { DeleteATicketCommandHandler } from '../../../../../application/command/ticket/delete/delete-a-ticket.command.handler';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';

export const deleteATicketCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_TICKET_COMMAND_HANDLER',
  useFactory: (
    ticketCommandRepository: TicketCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new DeleteATicketCommandHandler(ticketCommandRepository, ticketQueryRepository, logger);
  },
  inject: [TicketCommandRepository, TicketQueryRepository, LoggerAdapterService],
}
