import { GetOneTicketQueryHandlerService } from './get-one-ticket.query.handler.service';
import { ListAllTicketsQueryHandlerService } from './list-all-tickets.query.handler.service';

export const TicketQueryHandlers = [
  GetOneTicketQueryHandlerService,
  ListAllTicketsQueryHandlerService
];
