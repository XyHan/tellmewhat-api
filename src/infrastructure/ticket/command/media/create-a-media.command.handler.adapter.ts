import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CreateAMediaCommand } from '../../../../application/command/media/create/create-a-media.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(CreateAMediaCommand)
export class CreateAMediaCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_MEDIA_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateAMediaCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
