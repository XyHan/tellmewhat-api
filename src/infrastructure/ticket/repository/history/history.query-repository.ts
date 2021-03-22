import { HistoryQueryRepositoryInterface } from '../../../../domain/repository/history/history.query-repository.interface';
import { HistoryRepository } from './history.repository';
import { HistoryInterface } from '../../../../domain/model/ticket/history.model';
import { HistoryRepositoryException } from '../../../../domain/repository/history/history.repository.exception';
import { Inject, Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

@Injectable()
export class HistoryQueryRepository implements HistoryQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: HistoryRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findAll(options: findAllOptions): Promise<[HistoryInterface[], number]> {
    try {
      return await this.repository.findAndCount({ skip: options.offsetStart, take: options.size });
    } catch (e) {
      const message: string = `HistoryQueryRepository - Error on findAll historys`;
      this._logger.error(message);
      throw new HistoryRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<HistoryInterface | null> {
    try {
      return await this.repository.findOneOrFail({ uuid });
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`HistoryQueryRepository - findOne - History ${uuid} not found`);
        return null;
      }
      const message: string = `HistoryQueryRepository - Error on findOne history '${uuid}'`;
      this._logger.error(message);
      throw new HistoryRepositoryException(message);
    }
  }
}
