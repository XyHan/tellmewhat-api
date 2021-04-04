import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { Inject } from '@nestjs/common';
import { ListAllCommentsQuery } from '../../../../application/query/ticket/comment/list-all-comments/list-all-comments.query';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(ListAllCommentsQuery)
export class ListAllCommentsQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('LIST_ALL_COMMENTS_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: ListAllCommentsQuery): Promise<[CommentInterface[], number]> {
    return await this._queryHandler.handle(query);
  }
}
