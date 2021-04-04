import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { GetOneMediaQuery } from '../../../../application/query/ticket/media/get-one-media/get-one-media.query';
import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { Inject } from '@nestjs/common';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(GetOneMediaQuery)
export class GetOneMediaQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_MEDIA_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneMediaQuery): Promise<MediaInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
