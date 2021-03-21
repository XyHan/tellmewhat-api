import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentFactory } from '../../../../domain/factory/comment.factory';
import { UpdateACommentCommand } from './update-a-comment.command';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { UpdateACommentCommandHandlerException } from './update-a-comment.command.handler.exception';

export class UpdateACommentCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: CommentCommandRepositoryInterface;
  protected readonly _queryRepository: CommentQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: CommentCommandRepositoryInterface,
    queryRepository: CommentQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  async handle(command: UpdateACommentCommand): Promise<void> {
    const comment: CommentInterface = await this.findOneCommentByUuid(command.uuid);
    const updatedComment: CommentInterface = this.updateCommentFromCommand(command, comment);
    await this.updateComment(updatedComment);
  }

  private updateCommentFromCommand(command: UpdateACommentCommand, comment: CommentInterface): CommentInterface {
    try {
      return new CommentFactory(comment).generate(
        command.uuid,
        command.status,
        comment.createdAt,
        comment.createdBy,
        new Date(),
        command.updatedBy,
        command.content,
        comment.ticket
      );
    } catch (e) {
      const message: string = `UpdateACommentCommandHandler - updateCommentFromCommand - Comment update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateACommentCommandHandlerException(message);
    }
  }

  private async updateComment(updatedComment: CommentInterface): Promise<void> {
    try {
      await this._commandRepository.update(updatedComment);
      this._logger.info(`UpdateACommentCommandHandler - updateComment - Comment ${updatedComment.uuid} updated`);
    } catch (e) {
      const message: string = `UpdateACommentCommandHandler - updateComment - Comment update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateACommentCommandHandlerException(message);
    }
  }

  private async findOneCommentByUuid(uuid: string): Promise<CommentInterface> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      throw new UpdateACommentCommandHandlerException(e.message);
    }
  }
}
