import { QueryHandlerInterface } from '../../../query-handler.interface';
import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';
import { MediaInterface } from '../../../../../domain/model/ticket/media.model';
import { ListAllMediaQueryHandlerException } from './list-all-media.query.handler.exception';
import { ListAllMediaQuery } from './list-all-media.query';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';

export class ListAllMediaQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: MediaQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: MediaQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: ListAllMediaQuery): Promise<[MediaInterface[], number]> {
    try {
      return await this._repository.findAll({ size: query.size, offsetStart: query.offsetStart });
    } catch (e) {
      const message: string = `ListAllMediaQueryHandler - error: ${e.message}`;
      this._logger.error(message);
      throw new ListAllMediaQueryHandlerException(message);
    }
  }
}
