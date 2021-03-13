import { TicketCommandRepositoryInterface } from '../ticket.command-repository.interface';
import { TicketInterface } from '../../../model/ticket/ticket.model';
import { TicketRepositoryException } from '../ticket.repository.exception';
import { TicketFixtures } from '../../../fixtures/ticket.fixtures';

export class TicketCommandRepositoryMock implements TicketCommandRepositoryInterface {
  public async create(ticket: TicketInterface): Promise<TicketInterface> {
    this.isValidTicket(ticket);
    try {
      TicketFixtures.addTicket(ticket);
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on create ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }

  public async delete(ticket: TicketInterface): Promise<TicketInterface> {
    try {
      TicketFixtures.deleteTicket(ticket);
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on delete ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }

  public async update(ticket: TicketInterface): Promise<TicketInterface> {
    this.isValidTicket(ticket);
    try {
      TicketFixtures.updateTicket(ticket);
      return ticket;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on update ticket '${ticket.uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }

  private isValidTicket(ticket: TicketInterface): boolean {
    if (!ticket.subject.length || !ticket.uuid.length || !ticket.description.length) {
      const message: string = `TicketCommandRepository - Error on create ticket '${ticket.uuid}' - subject, uuid and description cannot be empty`;
      throw new TicketRepositoryException(message);
    }
    return true;
  }
}
