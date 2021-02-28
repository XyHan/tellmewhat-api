import { TicketInterface } from '../../../domain/model/ticket.model';

export interface PaginatedResponseInterface {
  page: number
  pages: number
  total: number
  tickets: TicketInterface[]
}
