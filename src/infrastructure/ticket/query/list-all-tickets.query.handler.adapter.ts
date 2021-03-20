import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { TicketInterface } from '../../../domain/model/ticket/ticket.model';
import { Inject } from '@nestjs/common';
import { ListAllTicketsQuery } from '../../../application/query/ticket/list-all-tickets/list-all-tickets.query';
import { QueryHandlerInterface } from '../../../application/query/query-handler.interface';

@QueryHandler(ListAllTicketsQuery)
export class ListAllTicketsQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('LIST_ALL_TICKETS_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: ListAllTicketsQuery): Promise<[TicketInterface[], number]> {
    return await this._queryHandler.handle(query);
  }
}
