import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteAMediaCommand } from '../../../../application/command/media/delete/delete-a-media.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(DeleteAMediaCommand)
export class DeleteAMediaCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_MEDIA_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteAMediaCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
