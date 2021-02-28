import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';
import { TicketQueryHandlers } from './query';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
  ],
  providers: [
    TicketRepository,
    TicketQueryRepository,
    TicketCommandRepository,
    ...TicketQueryHandlers
  ],
  exports: [
    TicketRepository,
    TicketQueryRepository,
    TicketCommandRepository,
  ]
})
export class TicketModule {}
