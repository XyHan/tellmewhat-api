import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserQueryRepository } from './repository/user.query-repository';
import { UserCommandRepository } from './repository/user.command-repository';
import { UserQueryHandlers } from './query';
import { UserCommandHandlers } from './command';
import { BcryptAdapter } from './adapter/bcrypt.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    LoggerModule
  ],
  providers: [
    UserQueryRepository,
    UserCommandRepository,
    ...UserQueryHandlers,
    ...UserCommandHandlers,
    BcryptAdapter,
  ],
  exports: [
    UserQueryRepository,
    UserCommandRepository,
  ]
})
export class SecurityModule {}
