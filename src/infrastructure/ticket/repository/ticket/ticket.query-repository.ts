import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketRepository } from './ticket.repository';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { TicketRepositoryException } from './ticket.repository.exception';
import { Injectable } from '@nestjs/common';
import { findAllOptions } from '../../../../domain/repository/find-all-options.type';
import { TicketNotFoundException } from './ticket.not-found.exception';

@Injectable()
export class TicketQueryRepository implements TicketQueryRepositoryInterface {
  constructor(private readonly repository: TicketRepository) {}

  public async findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
    try {
      return await this.repository.findAndCount({ skip: options.offsetStart, take: options.size });
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findAll tickets`);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface | null> {
    try {
      return await this.repository.findOneOrFail({ uuid });
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        return null;
      }
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findOne ticket '${uuid}'`);
    }
  }
}
