import { MediaCommandRepositoryInterface } from '../../../../domain/repository/media/media.command-repository.interface';
import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { MediaRepository } from './media.repository';
import { MediaRepositoryException } from '../../../../domain/repository/media/media.repository.exception';
import { MediaEntity } from '../../entity/media.entity';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';

@Injectable()
export class MediaCommandRepository implements MediaCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: MediaRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(media: MediaInterface): Promise<MediaInterface> {
    try {
      return await this.repository.save(media);
    } catch (e) {
      const message: string = `MediaCommandRepository - Error on create medium '${media.uuid}'`;
      this._logger.error(message);
      throw new MediaRepositoryException(message);
    }
  }

  public async delete(media: MediaEntity): Promise<MediaInterface> {
    try {
      return await this.repository.remove(media);
    } catch (e) {
      const message: string = `MediaCommandRepository - Error on delete medium '${media.uuid}'`;
      this._logger.error(message);
      throw new MediaRepositoryException(message);
    }
  }
}
