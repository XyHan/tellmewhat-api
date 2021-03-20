import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';
import { TicketQueryHandlers } from './query';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';
import { LoggerModule } from '../logger/logger.module';
import { TicketCommandHandlers } from './command';
import { getOneTicketQueryHandlerProvider } from './provider/query/get-one-ticket-query-handler.provider';
import { listAllTicketsQueryHandlerProvider } from './provider/query/list-all-tickets-query-handler.provider';
import { createATicketCommandHandlerProvider } from './provider/command/create-a-ticket-command-handler.provider';
import { updateATicketCommandHandlerProvider } from './provider/command/update-a-ticket-command-handler.provider';
import { deleteATicketCommandHandlerProvider } from './provider/command/delete-a-ticket-command-handler.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
    LoggerModule
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
  ],
  exports: [
    TicketQueryRepository,
    TicketCommandRepository,
  ]
})
export class TicketModule {}
