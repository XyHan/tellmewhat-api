import { Module } from '@nestjs/common';
import { AppController } from './rest/app/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';
import { TicketController } from './rest/ticket/ticket.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { UserController } from './rest/security/user.controller';
import { SecurityModule } from '../../infrastructure/security/security.module';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    TicketModule,
    SecurityModule,
    LoggerModule,
  ],
  controllers: [
    AppController,
    TicketController,
    UserController,
  ],
})
export class UiHttpModule {}
