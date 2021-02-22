import { Module } from '@nestjs/common';
import { AppController } from '../ui/http/rest/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
