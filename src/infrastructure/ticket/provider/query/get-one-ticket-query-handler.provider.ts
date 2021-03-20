import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { GetOneTicketQueryHandler } from '../../../../application/query/ticket/get-one-ticket/get-one-ticket.query.handler';
import { TicketQueryRepository } from '../../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';

export const getOneTicketQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_TICKET_QUERY_HANDLER',
  useFactory: (ticketRepository: TicketQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneTicketQueryHandler(ticketRepository, logger);
  },
  inject: [TicketQueryRepository, LoggerAdapterService],
}
