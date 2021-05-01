import { TicketInterface } from '../model/ticket/ticket.model';

export type findAllOptions = {
  sort?: string;
  offsetStart?: number;
  size?: number;
  filters?: Map<string, string | number | TicketInterface>;
  sources?: any[];
};
