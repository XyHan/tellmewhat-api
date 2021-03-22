import { MediaQueryRepositoryInterface } from '../../../../domain/repository/media/media.query-repository.interface';
import { MediaRepository } from './media.repository';
import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { MediaRepositoryException } from '../../../../domain/repository/media/media.repository.exception';
import { Inject, Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

@Injectable()
export class MediaQueryRepository implements MediaQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: MediaRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findAll(options: findAllOptions): Promise<[MediaInterface[], number]> {
    try {
      return await this.repository.findAndCount({ skip: options.offsetStart, take: options.size });
    } catch (e) {
      const message: string = `MediaQueryRepository - Error on findAll media`;
      this._logger.error(message);
      throw new MediaRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<MediaInterface | null> {
    try {
      return await this.repository.findOneOrFail(
        { uuid },
        { join: { alias: 'm', innerJoinAndSelect: { ticket: 'm.ticket' } } }
      );
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`MediaQueryRepository - findOne - Medium ${uuid} not found`);
        return null;
      }
      const message: string = `MediaQueryRepository - Error on findOne medium '${uuid}'`;
      this._logger.error(message);
      throw new MediaRepositoryException(message);
    }
  }
}
