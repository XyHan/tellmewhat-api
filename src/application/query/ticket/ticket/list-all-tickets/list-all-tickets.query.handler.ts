import { QueryHandlerInterface } from '../../../query-handler.interface';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { ListAllTicketsQueryHandlerException } from './list-all-tickets.query.handler.exception';
import { ListAllTicketsQuery } from './list-all-tickets.query';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';

export class ListAllTicketsQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: TicketQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: ListAllTicketsQuery): Promise<[TicketInterface[], number]> {
    try {
      const offsetStart = (query.page ? Number(query.page) - 1 : 0) * Number(query.size);
      return await this._repository.findAll({ size: query.size, offsetStart, sources: query.sources, sort: query.sort });
    } catch (e) {
      const message: string = `ListAllTicketsQueryHandler - error: ${e.message}`;
      this._logger.error(message);
      throw new ListAllTicketsQueryHandlerException(message);
    }
  }
}
