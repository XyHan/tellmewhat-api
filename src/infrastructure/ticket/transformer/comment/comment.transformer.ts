import { Injectable, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs/dist';
import { IQueryBus } from '@nestjs/cqrs';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByUuidQuery } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { plainToClass } from 'class-transformer';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentEntity } from '../../entity/comment.entity';
import { CommentTransformerException } from './comment.transformer.exception';

@Injectable()
export class CommentTransformer {
  private readonly _queryBus: IQueryBus;
  private readonly _logger: LoggerInterface;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._queryBus = queryBus;
    this._logger = logger;
  }

  async transform(comment: CommentInterface): Promise<CommentInterface> {
    if (comment.createdBy) {
      comment.createdBy = await this.getUserEmail(comment.createdBy);
    }
    if (comment.updatedBy) {
      comment.updatedBy = await this.getUserEmail(comment.updatedBy);
    }
    return plainToClass(CommentEntity, comment);
  }

  private async getUserEmail(uuid: string): Promise<string> {
    try {
      const query: GetOneUserByUuidQuery | null = new GetOneUserByUuidQuery(uuid, ['email']);
      const user: UserInterface = await this._queryBus.execute(query);
      return user && user.email ? user.email : '';
    } catch (e) {
      const message: string = `CommentController - findOneUserByUuid ${uuid} error. Previous: ${e.message}`;
      this._logger.error(message);
      throw new CommentTransformerException(message);
    }
  }
}
