import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CreateACommentCommand} from './create-a-comment.command';
import { CommentInterface, CommentModel } from '../../../../domain/model/ticket/comment.model';
import { CreateACommentCommandHandlerException } from './create-a-comment.command.handler.exception';
import { CommentFactory } from '../../../../domain/factory/comment.factory';

export class CreateACommentCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: CommentCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: CommentCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  public async handle(command: CreateACommentCommand): Promise<void> {
    const comment: CommentInterface = this.generateCommentFromCommand(command);
    await this.registerComment(comment);
  }

  private generateCommentFromCommand(command: CreateACommentCommand): CommentInterface {
    try {
      return new CommentFactory(new CommentModel()).generate(
        command.uuid,
        1,
        new Date(),
        command.createdBy,
        new Date(),
        command.createdBy,
        command.content,
      );
    } catch (e) {
      const message: string = `CreateACommentCommandHandler - generateCommentFromCommand - Comment generation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateACommentCommandHandlerException(message);
    }
  }

  private async registerComment(comment: CommentInterface): Promise<void> {
    try {
      await this._repository.create(comment);
      this._logger.info(`CreateACommentCommandHandler - Comment ${comment.uuid} registered`);
    } catch (e) {
      const message: string = `CreateACommentCommandHandler - registerComment - Comment registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateACommentCommandHandlerException(message);
    }
  }
}
