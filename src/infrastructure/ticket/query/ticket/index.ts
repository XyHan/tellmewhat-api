import { GetOneTicketQueryHandlerAdapter } from './get-one-ticket.query.handler.adapter';
import { ListAllTicketsQueryHandlerAdapter } from './list-all-tickets.query.handler.adapter';

export const TicketQueryHandlers = [
  GetOneTicketQueryHandlerAdapter,
  ListAllTicketsQueryHandlerAdapter
];
