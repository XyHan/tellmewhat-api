import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigInterface } from './config.interface';
import { TicketEntity } from '../ticket/entity/ticket.entity';
import { UserEntity } from '../security/entity/user.entity';
import { CommentEntity } from '../ticket/entity/comment.entity';
import { MediaEntity } from '../ticket/entity/media.entity';

@Injectable()
export class ConfigService implements ConfigInterface {
  private _storageDir: string = process.env.STORAGE_DIR;

  get storageDir(): string {
    return this._storageDir;
  }

  public getMysqlConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [TicketEntity, UserEntity, CommentEntity, MediaEntity],
      synchronize: true,
      keepConnectionAlive: true,
      debug: false,
    };
  }
}
