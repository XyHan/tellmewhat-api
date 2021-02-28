import { Module } from '@nestjs/common';
import { AppController } from './rest/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';
import { TicketController } from './rest/ticket/ticket.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../../infrastructure/logger/logger.module';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    TicketModule,
    LoggerModule,
  ],
  controllers: [
    AppController,
    TicketController
  ],
})
export class UiHttpModule {}
