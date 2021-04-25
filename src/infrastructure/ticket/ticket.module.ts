import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';
import { TicketQueryHandlers } from './query/ticket';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';
import { LoggerModule } from '../logger/logger.module';
import { TicketCommandHandlers } from './command/ticket';
import { getOneTicketQueryHandlerProvider } from './provider/query/ticket/get-one-ticket-query-handler.provider';
import { listAllTicketsQueryHandlerProvider } from './provider/query/ticket/list-all-tickets-query-handler.provider';
import { createATicketCommandHandlerProvider } from './provider/command/ticket/create-a-ticket-command-handler.provider';
import { updateATicketCommandHandlerProvider } from './provider/command/ticket/update-a-ticket-command-handler.provider';
import { deleteATicketCommandHandlerProvider } from './provider/command/ticket/delete-a-ticket-command-handler.provider';
import { CommentRepository } from './repository/comment/comment.repository';
import { CommentQueryRepository } from './repository/comment/comment.query-repository';
import { CommentCommandRepository } from './repository/comment/comment.command-repository';
import { getOneCommentQueryHandlerProvider } from './provider/query/comment/get-one-comment-query-handler.provider';
import { listAllCommentsQueryHandlerProvider } from './provider/query/comment/list-all-comments-query-handler.provider';
import { CommentQueryHandlers } from './query/comment';
import { createACommentCommandHandlerProvider } from './provider/command/comment/create-a-comment-command-handler.provider';
import { updateACommentCommandHandlerProvider } from './provider/command/comment/update-a-comment-command-handler.provider';
import { deleteACommentCommandHandlerProvider } from './provider/command/comment/delete-a-comment-command-handler.provider';
import { CommentCommandHandlers } from './command/comment';
import { MediaRepository } from './repository/media/media.repository';
import { MediaQueryRepository } from './repository/media/media.query-repository';
import { MediaCommandRepository } from './repository/media/media.command-repository';
import { createAMediaCommandHandlerProvider } from './provider/command/media/create-a-media-command-handler.provider';
import { MediaCommandHandlers } from './command/media';
import { deleteAMediaCommandHandlerProvider } from './provider/command/media/delete-a-media-command-handler.provider';
import { getOneMediaQueryHandlerProvider } from './provider/query/media/get-one-media-query-handler.provider';
import { MediaQueryHandlers } from './query/media';
import { listAllMediaQueryHandlerProvider } from './provider/query/media/list-all-media-query-handler.provider';
import { TicketTransformer } from './transformer/ticket.transformer';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository, CommentRepository, MediaRepository]),
    LoggerModule,
    CqrsModule
  ],
  providers: [
    TicketQueryRepository,
    TicketCommandRepository,
    getOneTicketQueryHandlerProvider,
    listAllTicketsQueryHandlerProvider,
    ...TicketQueryHandlers,
    createATicketCommandHandlerProvider,
    updateATicketCommandHandlerProvider,
    deleteATicketCommandHandlerProvider,
    ...TicketCommandHandlers,
    CommentQueryRepository,
    CommentCommandRepository,
    getOneCommentQueryHandlerProvider,
    listAllCommentsQueryHandlerProvider,
    ...CommentQueryHandlers,
    createACommentCommandHandlerProvider,
    updateACommentCommandHandlerProvider,
    deleteACommentCommandHandlerProvider,
    ...CommentCommandHandlers,
    MediaQueryRepository,
    MediaCommandRepository,
    createAMediaCommandHandlerProvider,
    deleteAMediaCommandHandlerProvider,
    ...MediaCommandHandlers,
    getOneMediaQueryHandlerProvider,
    listAllMediaQueryHandlerProvider,
    ...MediaQueryHandlers,
    TicketTransformer
  ],
  exports: [
    TicketQueryRepository,
    TicketCommandRepository,
    CommentQueryRepository,
    CommentCommandRepository,
    TicketTransformer
  ]
})
export class TicketModule {}
