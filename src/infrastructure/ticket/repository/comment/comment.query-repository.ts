import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { CommentRepository } from './comment.repository';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentRepositoryException } from '../../../../domain/repository/comment/comment.repository.exception';
import { Inject, Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { CommentEntity } from '../../entity/comment.entity';

@Injectable()
export class CommentQueryRepository implements CommentQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: CommentRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findAll(options: findAllOptions): Promise<[CommentInterface[], number]> {
    try {
      let findManyOptions: FindManyOptions<CommentEntity> = { skip: options.offsetStart, take: options.size };
      if (options.sources && options.sources.length) { findManyOptions.select = options.sources }
      if (options.filters?.get('ticket')) {
        findManyOptions.where = [
          { ticket: options.filters?.get('ticket') }
        ];
      }
      return await this.repository.findAndCount(findManyOptions);
    } catch (e) {
      const message: string = `CommentQueryRepository - Error on findAll comments`;
      this._logger.error(message);
      throw new CommentRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<CommentInterface | null> {
    try {
      return await this.repository.findOneOrFail(
        { uuid },
        { join: { alias: 'c', innerJoinAndSelect: { ticket: 'c.ticket' } } }
      );
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`CommentQueryRepository - findOne - Comment ${uuid} not found`);
        return null;
      }
      const message: string = `CommentQueryRepository - Error on findOne comment '${uuid}'`;
      this._logger.error(message);
      throw new CommentRepositoryException(message);
    }
  }
}
