import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CommentCommandRepository } from '../../../repository/comment/comment.command-repository';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { UpdateACommentCommandHandler } from '../../../../../application/command/comment/update/update-a-comment.command.handler';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentQueryRepository } from '../../../repository/comment/comment.query-repository';

export const updateACommentCommandHandlerProvider: FactoryProvider = {
  provide: 'UPDATE_A_COMMENT_COMMAND_HANDLER',
  useFactory: (
    commentCommandRepository: CommentCommandRepositoryInterface,
    commentQueryRepository: CommentQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new UpdateACommentCommandHandler(commentCommandRepository, commentQueryRepository, logger);
  },
  inject: [CommentCommandRepository, CommentQueryRepository, LoggerAdapterService],
}
