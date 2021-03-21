import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CreateACommentCommandHandler } from '../../../../../application/command/comment/create/create-a-comment.command.handler';
import { CommentCommandRepository } from '../../../repository/comment/comment.command-repository';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';

export const createACommentCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_COMMENT_COMMAND_HANDLER',
  useFactory: (
    commentRepository: CommentCommandRepositoryInterface,
    ticketRepository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new CreateACommentCommandHandler(commentRepository, ticketRepository, logger);
  },
  inject: [CommentCommandRepository, TicketQueryRepository, LoggerAdapterService],
}
