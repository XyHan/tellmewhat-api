import { QueryHandlerInterface } from '../../query-handler.interface';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { GetOneTicketQuery } from './get-one-ticket.query';
import { GetOneTicketQueryHandlerException } from './get-one-ticket.query.handler.exception';
import { TicketInterface } from '../../../../domain/model/ticket.model';

export class GetOneTicketHandler implements QueryHandlerInterface {
  protected readonly _repository: TicketQueryRepositoryInterface;

  constructor(repository: TicketQueryRepositoryInterface) {
    this._repository = repository;
  }

  async handle(query: GetOneTicketQuery): Promise<TicketInterface> {
    try {
      return await this._repository.findOne(query.uuid);
    } catch (e) {
      throw new GetOneTicketQueryHandlerException(`GetOneTicketHandler - Ticket ${query.uuid} error: ${e.message}`);
    }
  }
}
