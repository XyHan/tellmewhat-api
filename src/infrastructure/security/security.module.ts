import {FactoryProvider, Module} from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserQueryRepository } from './repository/user.query-repository';
import { UserCommandRepository } from './repository/user.command-repository';
import { UserQueryHandlers } from './query/user';
import { UserCommandHandlers } from './command';
import { BcryptAdapter } from './adapter/bcrypt.adapter';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './service/auth/auth.service';
import { JsonWebTokenAdapter } from './adapter/jwt/json-web-token.adapter';
import { AuthQueryHandlers } from './query/auth';
import { loginQueryHandlerProvider } from './provider/login-query-handler.provider';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository]),
    LoggerModule,
    PassportModule
  ],
  providers: [
    UserQueryRepository,
    UserCommandRepository,
    ...UserQueryHandlers,
    ...UserCommandHandlers,
    BcryptAdapter,
    JsonWebTokenAdapter,
    AuthService,
    ...AuthQueryHandlers,
    loginQueryHandlerProvider
  ],
  exports: [
    UserQueryRepository,
    UserCommandRepository,
  ]
})
export class SecurityModule {}
