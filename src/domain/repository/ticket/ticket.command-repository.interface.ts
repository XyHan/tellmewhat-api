import { TicketInterface } from '../../model/ticket.model';

export interface TicketCommandRepositoryInterface {
  create(ticket: TicketInterface): Promise<TicketInterface>;
  update(ticket: TicketInterface): Promise<TicketInterface>;
  delete(ticket: TicketInterface): Promise<TicketInterface>;
}
