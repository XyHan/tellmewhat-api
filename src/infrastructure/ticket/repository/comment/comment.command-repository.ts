import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentRepository } from './comment.repository';
import { CommentRepositoryException } from '../../../../domain/repository/comment/comment.repository.exception';
import { CommentEntity } from '../../entity/comment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';

@Injectable()
export class CommentCommandRepository implements CommentCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: CommentRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(comment: CommentInterface): Promise<CommentInterface> {
    try {
      return await this.repository.save(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on create comment '${comment.uuid}'`;
      this._logger.error(message);
      throw new CommentRepositoryException(message);
    }
  }

  public async delete(comment: CommentEntity): Promise<CommentInterface> {
    try {
      return await this.repository.remove(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on delete comment '${comment.uuid}'`;
      this._logger.error(message);
      throw new CommentRepositoryException(message);
    }
  }

  public async update(comment: CommentInterface): Promise<CommentInterface> {
    try {
      return await this.repository.save(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on update comment '${comment.uuid}'`;
      this._logger.error(message);
      throw new CommentRepositoryException(message);
    }
  }
}
