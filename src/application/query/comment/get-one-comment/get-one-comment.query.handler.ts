import { QueryHandlerInterface } from '../../query-handler.interface';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { GetOneCommentQuery } from './get-one-comment.query';
import { GetOneCommentQueryHandlerException } from './get-one-comment.query.handler.exception';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

export class GetOneCommentQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: CommentQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: CommentQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneCommentQuery): Promise<CommentInterface | null> {
    try {
      return await this._repository.findOne(query.uuid);
    } catch (e) {
      const message: string = `GetOneCommentQueryHandler - Comment ${query.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneCommentQueryHandlerException(message);
    }
  }
}
