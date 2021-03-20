import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteATicketCommand } from '../../../application/command/ticket/delete/delete-a-ticket.command';
import { CommandHandlerInterface } from '../../../application/command/command-handler.interface';

@CommandHandler(DeleteATicketCommand)
export class DeleteATicketCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_TICKET_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteATicketCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
