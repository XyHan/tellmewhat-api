import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';
import { TicketQueryHandlers } from './query';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
    LoggerModule
  ],
  providers: [
    TicketQueryRepository,
    TicketCommandRepository,
    ...TicketQueryHandlers
  ],
  exports: [
    TicketQueryRepository,
    TicketCommandRepository,
  ]
})
export class TicketModule {}
