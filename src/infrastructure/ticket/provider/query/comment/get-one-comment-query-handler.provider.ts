import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { GetOneCommentQueryHandler } from '../../../../../application/query/ticket/comment/get-one-comment/get-one-comment.query.handler';
import { CommentQueryRepository } from '../../../repository/comment/comment.query-repository';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';

export const getOneCommentQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_COMMENT_QUERY_HANDLER',
  useFactory: (commentRepository: CommentQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneCommentQueryHandler(commentRepository, logger);
  },
  inject: [CommentQueryRepository, LoggerAdapterService],
}
