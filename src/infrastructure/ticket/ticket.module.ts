import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';
import { TicketQueryHandlers } from './query';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';
import { LoggerModule } from '../logger/logger.module';
import { TicketCommandHandlers } from './command';
import { GetOneTicketQueryHandlerProvider } from './provider/query/get-one-ticket-query-handler.provider';
import { ListAllTicketsQueryHandlerProvider } from './provider/query/list-all-tickets-query-handler.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
    LoggerModule
  ],
  providers: [
    TicketQueryRepository,
    TicketCommandRepository,
    GetOneTicketQueryHandlerProvider,
    ListAllTicketsQueryHandlerProvider,
    ...TicketQueryHandlers,
    ...TicketCommandHandlers,
  ],
  exports: [
    TicketQueryRepository,
    TicketCommandRepository,
  ]
})
export class TicketModule {}
