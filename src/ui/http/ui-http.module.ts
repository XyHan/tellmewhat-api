import { Module } from '@nestjs/common';
import { AppController } from './rest/app/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';
import { TicketController } from './rest/ticket/ticket.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { UserController } from './rest/security/controller/user/user.controller';
import { SecurityModule } from '../../infrastructure/security/security.module';
import { AuthController } from './rest/security/controller/auth/auth.controller';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    TicketModule,
    SecurityModule,
    LoggerModule,
  ],
  providers: [
    AuthGuard,
  ],
  controllers: [
    AppController,
    TicketController,
    UserController,
    AuthController
  ],
})
export class UiHttpModule {}
