import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketRepository } from './ticket.repository';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { TicketRepositoryException } from '../../../../domain/repository/ticket/ticket.repository.exception';
import { Inject, Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { TicketEntity } from '../../entity/ticket.entity';
import { Like } from 'typeorm';

@Injectable()
export class TicketQueryRepository implements TicketQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: TicketRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
    try {
      let findManyOptions: FindManyOptions<TicketEntity> = { skip: options.offsetStart, take: options.size };
      if (options.sources && options.sources.length) { findManyOptions.select = options.sources }
      if (options.sort) { findManyOptions.order = { updatedAt: options.sort === 'ASC' ? 'ASC' : 'DESC' }; }
      if (options.filters?.get('search')) {
        findManyOptions.where = [
          { subject: Like(`%${options.filters.get('search').toString()}%`) },
          { description: Like(`%${options.filters.get('search').toString()}%`) },
        ];
      }
      return await this.repository.findAndCount(findManyOptions);
    } catch (e) {
      const message: string = `TicketQueryRepository - Error on findAll tickets`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }

  public async findOne(uuid: string, sources: any[]): Promise<TicketInterface | null> {
    try {
      let options: FindOneOptions<TicketEntity> = {};
      if (sources && sources.length) { options.select = sources; }
      return await this.repository.findOneOrFail({ uuid }, options);
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`TicketQueryRepository - findOne - Ticket ${uuid} not found`);
        return null;
      }
      const message: string = `TicketQueryRepository - Error on findOne ticket '${uuid}'`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }
}
