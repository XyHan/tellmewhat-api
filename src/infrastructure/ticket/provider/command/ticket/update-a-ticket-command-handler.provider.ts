import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { UpdateATicketCommandHandler } from '../../../../../application/command/ticket/update/update-a-ticket.command.handler';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';

export const updateATicketCommandHandlerProvider: FactoryProvider = {
  provide: 'UPDATE_A_TICKET_COMMAND_HANDLER',
  useFactory: (
    ticketCommandRepository: TicketCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new UpdateATicketCommandHandler(ticketCommandRepository, ticketQueryRepository, logger);
  },
  inject: [TicketCommandRepository, TicketQueryRepository, LoggerAdapterService],
}
