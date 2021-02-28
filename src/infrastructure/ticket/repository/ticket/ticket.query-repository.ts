import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketRepository } from './ticket.repository';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { TicketRepositoryException } from './ticket.repository.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketQueryRepository implements TicketQueryRepositoryInterface {
  private readonly _ticketRepository: TicketRepository

  constructor(ticketRepository: TicketRepository) {
    this._ticketRepository = ticketRepository
  }

  public async findAll(): Promise<TicketInterface[]> {
    try {
      return await this._ticketRepository.find({ take: 10 });
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findAll tickets`);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface> {
    try {
      return await this._ticketRepository.findOneOrFail({ uuid });
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on findOneOrNull ticket '${uuid}'`);
    }
  }
}
