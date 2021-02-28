import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './repository/ticket/ticket.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
  ],
  providers: [
    TicketRepository
  ],
  exports: [
    TicketRepository
  ]
})
export class TicketModule {}
