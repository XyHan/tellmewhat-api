import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CommentQueryRepository } from '../../../repository/comment/comment.query-repository';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';
import { ListAllCommentsQueryHandler } from '../../../../../application/query/ticket/comment/list-all-comments/list-all-comments.query.handler';

export const listAllCommentsQueryHandlerProvider: FactoryProvider = {
  provide: 'LIST_ALL_COMMENTS_QUERY_HANDLER',
  useFactory: (commentRepository: CommentQueryRepositoryInterface, logger: LoggerInterface) => {
    return new ListAllCommentsQueryHandler(commentRepository, logger);
  },
  inject: [CommentQueryRepository, LoggerAdapterService],
}
