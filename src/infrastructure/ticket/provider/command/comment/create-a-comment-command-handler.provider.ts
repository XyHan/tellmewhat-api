import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CreateACommentCommandHandler } from '../../../../../application/command/comment/create/create-a-comment.command.handler';
import { CommentCommandRepository } from '../../../repository/comment/comment.command-repository';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';

export const createACommentCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_COMMENT_COMMAND_HANDLER',
  useFactory: (
    commentRepository: CommentCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new CreateACommentCommandHandler(commentRepository, ticketQueryRepository, ticketCommandRepository, logger);
  },
  inject: [CommentCommandRepository, TicketQueryRepository, TicketCommandRepository, LoggerAdapterService],
}
