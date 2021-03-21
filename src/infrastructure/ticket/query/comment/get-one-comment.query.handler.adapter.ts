import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { GetOneCommentQuery } from '../../../../application/query/comment/get-one-comment/get-one-comment.query';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { Inject } from '@nestjs/common';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(GetOneCommentQuery)
export class GetOneCommentQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_COMMENT_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneCommentQuery): Promise<CommentInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
