import { QueryHandlerInterface } from '../../../query-handler.interface';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { GetOneTicketQuery } from './get-one-ticket.query';
import { GetOneTicketQueryHandlerException } from './get-one-ticket.query.handler.exception';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';

export class GetOneTicketQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: TicketQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneTicketQuery): Promise<TicketInterface | null> {
    try {
      return await this._repository.findOne(query.uuid, []);
    } catch (e) {
      const message: string = `GetOneTicketQueryHandler - Ticket ${query.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneTicketQueryHandlerException(message);
    }
  }
}
