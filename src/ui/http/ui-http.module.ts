import { Module } from '@nestjs/common';
import { AppController } from './rest/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';
import { TicketController } from './rest/ticket/ticket.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    TicketModule,
  ],
  controllers: [
    AppController,
    TicketController
  ],
})
export class UiHttpModule {}
