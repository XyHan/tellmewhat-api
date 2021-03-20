import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { GetOneTicketQuery } from '../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { TicketInterface } from '../../../domain/model/ticket/ticket.model';
import { Inject } from '@nestjs/common';
import { QueryHandlerInterface } from '../../../application/query/query-handler.interface';

@QueryHandler(GetOneTicketQuery)
export class GetOneTicketQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_TICKET_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneTicketQuery): Promise<TicketInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
