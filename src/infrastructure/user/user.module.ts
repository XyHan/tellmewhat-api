import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { UserRepository } from './repository/user.repository';
import { UserQueryRepository } from './repository/user.query-repository';
import { UserCommandRepository } from './repository/user.command-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    LoggerModule
  ],
  providers: [
    UserQueryRepository,
    UserCommandRepository,
  ],
  exports: [
    UserQueryRepository,
    UserCommandRepository,
  ]
})
export class UserModule {}
