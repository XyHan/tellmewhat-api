import { QueryHandlerInterface } from '../../query-handler.interface';
import { MediaQueryRepositoryInterface } from '../../../../domain/repository/media/media.query-repository.interface';
import { GetOneMediaQuery } from './get-one-media.query';
import { GetOneMediaQueryHandlerException } from './get-one-media.query.handler.exception';
import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

export class GetOneMediaQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: MediaQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: MediaQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneMediaQuery): Promise<MediaInterface | null> {
    try {
      return await this._repository.findOne(query.uuid);
    } catch (e) {
      const message: string = `GetOneMediaQueryHandler - Media ${query.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneMediaQueryHandlerException(message);
    }
  }
}
