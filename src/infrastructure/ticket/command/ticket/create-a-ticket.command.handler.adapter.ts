import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CreateATicketCommand } from '../../../../application/command/ticket/ticket/create/create-a-ticket.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(CreateATicketCommand)
export class CreateATicketCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_TICKET_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateATicketCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
