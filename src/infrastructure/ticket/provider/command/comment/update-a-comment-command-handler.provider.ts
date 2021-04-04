import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CommentCommandRepository } from '../../../repository/comment/comment.command-repository';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { UpdateACommentCommandHandler } from '../../../../../application/command/ticket/comment/update/update-a-comment.command.handler';
import { CommentQueryRepositoryInterface } from '../../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentQueryRepository } from '../../../repository/comment/comment.query-repository';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';

export const updateACommentCommandHandlerProvider: FactoryProvider = {
  provide: 'UPDATE_A_COMMENT_COMMAND_HANDLER',
  useFactory: (
    commentCommandRepository: CommentCommandRepositoryInterface,
    commentQueryRepository: CommentQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new UpdateACommentCommandHandler(commentCommandRepository, commentQueryRepository, ticketCommandRepository, logger);
  },
  inject: [CommentCommandRepository, CommentQueryRepository, TicketCommandRepository, LoggerAdapterService],
}
