import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteACommentCommand } from '../../../../application/command/ticket/comment/delete/delete-a-comment.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(DeleteACommentCommand)
export class DeleteACommentCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_COMMENT_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteACommentCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
