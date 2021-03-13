import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { TicketRepository } from './ticket.repository';
import { TicketRepositoryException } from '../../../../domain/repository/ticket/ticket.repository.exception';
import { TicketEntity } from '../../entity/ticket.entity';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';

@Injectable()
export class TicketCommandRepository implements TicketCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: TicketRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(ticket: TicketInterface): Promise<TicketInterface> {
    try {
      return await this.repository.save(ticket);
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on create ticket '${ticket.uuid}'`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }

  public async delete(ticket: TicketEntity): Promise<TicketInterface> {
    try {
      return await this.repository.remove(ticket);
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on delete ticket '${ticket.uuid}'`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }

  public async update(ticket: TicketInterface): Promise<TicketInterface> {
    try {
      return await this.repository.save(ticket);
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on update ticket '${ticket.uuid}'`;
      this._logger.error(message);
      throw new TicketRepositoryException(message);
    }
  }
}
