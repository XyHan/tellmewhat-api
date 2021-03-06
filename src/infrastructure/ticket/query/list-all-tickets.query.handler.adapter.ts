import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { TicketInterface } from '../../../domain/model/ticket.model';
import { Inject } from '@nestjs/common';
import { TicketQueryRepository } from '../repository/ticket/query/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';
import { ListAllTicketsQuery } from '../../../application/query/ticket/list-all-tickets/list-all-tickets.query';
import { ListAllTicketsQueryHandler } from '../../../application/query/ticket/list-all-tickets/list-all-tickets.query.handler';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger.interface';

@QueryHandler(ListAllTicketsQuery)
export class ListAllTicketsQueryHandlerAdapter extends ListAllTicketsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(TicketQueryRepository) repository: TicketQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(repository, logger);
  }

  async execute(query: ListAllTicketsQuery): Promise<[TicketInterface[], number]> {
    return await this.handle(query);
  }
}
