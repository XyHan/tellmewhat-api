import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigInterface } from './config.interface';
import { TicketEntity } from '../ticket/entity/ticket.entity';
import { UserEntity } from '../security/entity/user.entity';
import { CommentEntity } from '../ticket/entity/comment.entity';

@Injectable()
export class ConfigService implements ConfigInterface {
  public getMysqlConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [TicketEntity, UserEntity, CommentEntity],
      synchronize: true,
      keepConnectionAlive: true,
      debug: false,
    };
  }
}
