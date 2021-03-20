import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { UpdateATicketCommand } from '../../../application/command/ticket/update/update-a-ticket.command';
import { CommandHandlerInterface } from '../../../application/command/command-handler.interface';

@CommandHandler(UpdateATicketCommand)
export class UpdateATicketCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('UPDATE_A_TICKET_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: UpdateATicketCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
