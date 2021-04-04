import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { ListAllTicketsQueryHandler } from '../../../../../application/query/ticket/ticket/list-all-tickets/list-all-tickets.query.handler';

export const listAllTicketsQueryHandlerProvider: FactoryProvider = {
  provide: 'LIST_ALL_TICKETS_QUERY_HANDLER',
  useFactory: (ticketRepository: TicketQueryRepositoryInterface, logger: LoggerInterface) => {
    return new ListAllTicketsQueryHandler(ticketRepository, logger);
  },
  inject: [TicketQueryRepository, LoggerAdapterService],
}
