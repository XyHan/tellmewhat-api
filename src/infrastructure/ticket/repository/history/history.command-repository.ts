import { HistoryCommandRepositoryInterface } from '../../../../domain/repository/history/history.command-repository.interface';
import { HistoryInterface } from '../../../../domain/model/ticket/history.model';
import { HistoryRepository } from './history.repository';
import { HistoryRepositoryException } from '../../../../domain/repository/history/history.repository.exception';
import { HistoryEntity } from '../../entity/history.entity';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';

@Injectable()
export class HistoryCommandRepository implements HistoryCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: HistoryRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(history: HistoryInterface): Promise<HistoryInterface> {
    try {
      return await this.repository.save(history);
    } catch (e) {
      const message: string = `HistoryCommandRepository - Error on create history '${history.uuid}'`;
      this._logger.error(message);
      throw new HistoryRepositoryException(message);
    }
  }

  public async delete(history: HistoryEntity): Promise<HistoryInterface> {
    try {
      return await this.repository.remove(history);
    } catch (e) {
      const message: string = `HistoryCommandRepository - Error on delete history '${history.uuid}'`;
      this._logger.error(message);
      throw new HistoryRepositoryException(message);
    }
  }

  public async update(history: HistoryInterface): Promise<HistoryInterface> {
    try {
      return await this.repository.save(history);
    } catch (e) {
      const message: string = `HistoryCommandRepository - Error on update history '${history.uuid}'`;
      this._logger.error(message);
      throw new HistoryRepositoryException(message);
    }
  }
}
