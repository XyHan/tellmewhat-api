import { CreateATicketCommandHandlerAdapter } from './create-a-ticket.command.handler.adapter';
import { UpdateATicketCommandHandlerAdapter } from './update-a-ticket.command.handler.adapter';
import { DeleteATicketCommandHandlerAdapter } from './delete-a-ticket.command.handler.adapter';

export const TicketCommandHandlers = [
  CreateATicketCommandHandlerAdapter,
  UpdateATicketCommandHandlerAdapter,
  DeleteATicketCommandHandlerAdapter
];
