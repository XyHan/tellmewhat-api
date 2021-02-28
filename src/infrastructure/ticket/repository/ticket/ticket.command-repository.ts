import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { TicketRepository } from './ticket.repository';
import { TicketRepositoryException } from './ticket.repository.exception';
import { TicketEntity } from '../../entity/ticket.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketCommandRepository implements TicketCommandRepositoryInterface {
  private readonly _ticketRepository: TicketRepository

  constructor(ticketRepository: TicketRepository) {
    this._ticketRepository = ticketRepository
  }

  public async create(ticket: TicketInterface): Promise<void> {
    try {
      await this._ticketRepository.save(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on create ticket '${ticket.uuid}'`);
    }
  }

  public async delete(ticket: TicketEntity): Promise<void> {
    try {
      await this._ticketRepository.remove(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on delete ticket '${ticket.uuid}'`);
    }
  }

  public async update(ticket: TicketInterface): Promise<void> {
    try {
      await this._ticketRepository.save(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on update ticket '${ticket.uuid}'`);
    }
  }
}
