import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentFactory } from '../../../../domain/factory/comment.factory';
import { UpdateACommentCommand } from './update-a-comment.command';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { UpdateACommentCommandHandlerException } from './update-a-comment.command.handler.exception';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';

export class UpdateACommentCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: CommentCommandRepositoryInterface;
  protected readonly _queryRepository: CommentQueryRepositoryInterface;
  protected readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: CommentCommandRepositoryInterface,
    queryRepository: CommentQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._ticketCommandRepository = ticketCommandRepository;
    this._logger = logger;
  }

  async handle(command: UpdateACommentCommand): Promise<void> {
    const comment: CommentInterface | null = await this.findOneCommentByUuid(command.uuid);
    if (!comment) throw new UpdateACommentCommandHandlerException(`UpdateACommentCommandHandler - Comment ${command.uuid} not found.`);
    const updatedComment: CommentInterface = this.updateCommentFromCommand(command, comment);
    await this.updateComment(updatedComment);
    await this.updateParent(updatedComment);
  }

  private updateCommentFromCommand(command: UpdateACommentCommand, comment: CommentInterface): CommentInterface {
    try {
      return new CommentFactory(comment).generate(
        comment.uuid,
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

  private async findOneCommentByUuid(uuid: string): Promise<CommentInterface | null> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      throw new UpdateACommentCommandHandlerException(e.message);
    }
  }

  private async updateParent(comment: CommentInterface): Promise<void> {
    try {
      const ticket: TicketInterface = comment.ticket;
      ticket.updatedBy = comment.updatedBy;
      ticket.updatedAt = comment.updatedAt;
      await this._ticketCommandRepository.update(ticket);
    } catch (e) {
      const message: string = `UpdateACommentCommandHandler - updateParent - Comment ${comment.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateACommentCommandHandlerException(message);
    }
  }
}
