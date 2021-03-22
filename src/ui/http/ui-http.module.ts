import { Module } from '@nestjs/common';
import { AppController } from './rest/app/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { TicketModule } from '../../infrastructure/ticket/ticket.module';
import { TicketController } from './rest/ticket/controller/ticket/ticket.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { UserController } from './rest/security/controller/user/user.controller';
import { SecurityModule } from '../../infrastructure/security/security.module';
import { AuthController } from './rest/security/controller/auth/auth.controller';
import { AuthGuard } from './guard/auth.guard';
import { CommentController } from './rest/ticket/controller/comment/comment.controller';
import { MediaController } from './rest/ticket/controller/media/media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../infrastructure/config/config.module';
import { ConfigService } from '../../infrastructure/config/config.service';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    TicketModule,
    SecurityModule,
    LoggerModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.storageDir,
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    AuthGuard,
  ],
  controllers: [
    AppController,
    TicketController,
    UserController,
    AuthController,
    CommentController,
    MediaController
  ],
})
export class UiHttpModule {}
