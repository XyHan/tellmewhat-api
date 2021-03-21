import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { UpdateACommentCommand } from '../../../../application/command/comment/update/update-a-comment.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(UpdateACommentCommand)
export class UpdateACommentCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('UPDATE_A_COMMENT_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: UpdateACommentCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
