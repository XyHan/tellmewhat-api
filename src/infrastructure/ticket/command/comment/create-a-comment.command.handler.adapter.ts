import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CreateACommentCommand } from '../../../../application/command/comment/create/create-a-comment.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(CreateACommentCommand)
export class CreateACommentCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_COMMENT_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateACommentCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
