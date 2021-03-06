import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketRepository } from '../ticket.repository';
import { TicketInterface } from '../../../../../domain/model/ticket.model';
import { TicketRepositoryException } from '../ticket.repository.exception';
import { Inject, Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../../domain/repository/find-all-options.type';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../domain/utils/logger.interface';

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
      return await this.repository.findAndCount({ skip: options.offsetStart, take: options.size });
    } catch (e) {
      const message: string = `TicketQueryRepository - Error on findAll tickets`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface | null> {
    try {
      return await this.repository.findOneOrFail({ uuid });
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
