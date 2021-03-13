import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { TicketCommandRepositoryInterface } from '../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../repository/ticket/ticket.command-repository';
import { UpdateATicketCommand } from '../../../application/command/ticket/update/update-a-ticket.command';
import { TicketQueryRepository } from '../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';
import { UpdateATicketCommandHandler } from '../../../application/command/ticket/update/update-a-ticket.command.handler';

@CommandHandler(UpdateATicketCommand)
export class UpdateATicketCommandHandlerAdapter extends UpdateATicketCommandHandler implements ICommandHandler {
  constructor(
    @Inject(TicketCommandRepository) commandRepository: TicketCommandRepositoryInterface,
    @Inject(TicketQueryRepository) queryRepository: TicketQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(commandRepository, queryRepository, logger);
  }

  async execute(command: UpdateATicketCommand): Promise<void> {
    return await this.handle(command);
  }
}
