import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { Inject } from '@nestjs/common';
import { ListAllMediaQuery } from '../../../../application/query/ticket/media/list-all-media/list-all-media.query';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(ListAllMediaQuery)
export class ListAllMediaQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('LIST_ALL_MEDIA_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: ListAllMediaQuery): Promise<[MediaInterface[], number]> {
    return await this._queryHandler.handle(query);
  }
}
