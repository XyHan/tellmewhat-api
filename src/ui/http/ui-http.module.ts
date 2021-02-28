import { Module } from '@nestjs/common';
import { AppController } from './rest/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';

@Module({
  imports: [
    AppModule,
    TicketModule
  ],
  controllers: [AppController],
})
export class UiHttpModule {}
