import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket.model';
import { TicketRepository } from './ticket.repository';
import { TicketRepositoryException } from './ticket.repository.exception';
import { TicketEntity } from '../../entity/ticket.entity';

export class TicketCommandRepository implements TicketCommandRepositoryInterface {
  constructor(private readonly ticketRepository: TicketRepository) {}

  public async create(ticket: TicketInterface): Promise<void> {
    try {
      await this.ticketRepository.save(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on create ticket '${ticket.uuid}'`);
    }
  }

  public async delete(ticket: TicketEntity): Promise<void> {
    try {
      await this.ticketRepository.remove(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on delete ticket '${ticket.uuid}'`);
    }
  }

  public async update(ticket: TicketInterface): Promise<void> {
    try {
      await this.ticketRepository.save(ticket);
    } catch (e) {
      throw new TicketRepositoryException(`TicketCommandRepository - Error on update ticket '${ticket.uuid}'`);
    }
  }
}
