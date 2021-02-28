import { TicketInterface } from '../../model/ticket.model';

export interface TicketQueryRepositoryInterface {
  findOne(uuid: string): Promise<TicketInterface>;
  findAll(): Promise<TicketInterface[]>;
}
