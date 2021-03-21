import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CommentCommandRepository } from '../../../repository/comment/comment.command-repository';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';
import { DeleteACommentCommandHandler } from '../../../../../application/command/comment/delete/delete-a-comment.command.handler';
import { CommentQueryRepository } from '../../../repository/comment/comment.query-repository';

export const deleteACommentCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_COMMENT_COMMAND_HANDLER',
  useFactory: (
    commentCommandRepository: CommentCommandRepositoryInterface,
    commentQueryRepository: CommentQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new DeleteACommentCommandHandler(commentCommandRepository, commentQueryRepository, logger);
  },
  inject: [CommentCommandRepository, CommentQueryRepository, LoggerAdapterService],
}
