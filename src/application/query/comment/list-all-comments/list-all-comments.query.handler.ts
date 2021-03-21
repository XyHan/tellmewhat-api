import { QueryHandlerInterface } from '../../query-handler.interface';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { ListAllCommentsQueryHandlerException } from './list-all-comments.query.handler.exception';
import { ListAllCommentsQuery } from './list-all-comments.query';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

export class ListAllCommentsQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: CommentQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: CommentQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: ListAllCommentsQuery): Promise<[CommentInterface[], number]> {
    try {
      return await this._repository.findAll({ size: query.size, offsetStart: query.offsetStart });
    } catch (e) {
      const message: string = `ListAllCommentsQueryHandler - error: ${e.message}`;
      this._logger.error(message);
      throw new ListAllCommentsQueryHandlerException(message);
    }
  }
}
