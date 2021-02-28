import { TicketInterface } from '../../model/ticket.model';

export interface TicketCommandRepositoryInterface {
  create(ticket: TicketInterface): Promise<void>;
  update(ticket: TicketInterface): Promise<void>;
  delete(ticket: TicketInterface): Promise<void>;
}
