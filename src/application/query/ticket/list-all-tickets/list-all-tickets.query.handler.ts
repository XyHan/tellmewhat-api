import { QueryHandlerInterface } from '../../query-handler.interface';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { ListAllTicketsQueryHandlerException } from './list-all-tickets.query.handler.exception';
import { ListAllTicketsQuery } from './list-all-tickets.query';

export class ListAllTicketsQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: TicketQueryRepositoryInterface;

  constructor(repository: TicketQueryRepositoryInterface) {
    this._repository = repository;
  }

  async handle(query: ListAllTicketsQuery): Promise<[TicketInterface[], number]> {
    try {
      return await this._repository.findAll({ size: query.size, offsetStart: query.offsetStart });
    } catch (e) {
      throw new ListAllTicketsQueryHandlerException(`ListAllTicketsQueryHandler - error: ${e.message}`);
    }
  }
}
