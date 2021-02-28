import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { TicketInterface } from '../../../domain/model/ticket.model';
import { Inject } from '@nestjs/common';
import { TicketQueryRepository } from '../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';
import { ListAllTicketsQuery } from '../../../application/query/ticket/list-all-tickets/list-all-tickets.query';
import { ListAllTicketsQueryHandler } from '../../../application/query/ticket/list-all-tickets/list-all-tickets.query.handler';

@QueryHandler(ListAllTicketsQuery)
export class ListAllTicketsQueryHandlerService extends ListAllTicketsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(TicketQueryRepository) repository: TicketQueryRepositoryInterface
  ) {
    super(repository);
  }

  async execute(query: ListAllTicketsQuery): Promise<[TicketInterface[], number]> {
    return await this.handle(query);
  }
}
