import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket.model';
import { TicketRepositoryException } from '../ticket.repository.exception';
import { TicketEntity } from '../../../entity/ticket.entity';
import { TicketFixtures } from '../../../fixtures/ticket.fixtures';

export class TicketCommandRepositoryMock implements TicketCommandRepositoryInterface {
  public async create(ticket: TicketInterface): Promise<TicketInterface> {
    try {
      TicketFixtures.addTicket(ticket);
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on create ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }

  public async delete(ticket: TicketEntity): Promise<TicketInterface> {
    try {
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on delete ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }

  public async update(ticket: TicketInterface): Promise<TicketInterface> {
    try {
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on update ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }
}
