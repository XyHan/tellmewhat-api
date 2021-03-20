import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { CreateATicketCommandHandler } from '../../../../application/command/ticket/create/create-a-ticket.command.handler';
import { TicketCommandRepository } from '../../repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';

export const createATicketCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_TICKET_COMMAND_HANDLER',
  useFactory: (ticketRepository: TicketCommandRepositoryInterface, logger: LoggerInterface) => {
    return new CreateATicketCommandHandler(ticketRepository, logger);
  },
  inject: [TicketCommandRepository, LoggerAdapterService],
}
