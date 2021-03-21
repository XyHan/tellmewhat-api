import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { CommentCommandRepositoryInterface } from '../../../../domain/repository/comment/comment.command-repository.interface';
import { CommentInterface } from '../../../../domain/model/ticket/comment.model';
import { CommentQueryRepositoryInterface } from '../../../../domain/repository/comment/comment.query-repository.interface';
import { DeleteACommentCommandHandlerException } from './delete-a-comment.command.handler.exception';
import { DeleteACommentCommand } from './delete-a-comment.command';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';

export class DeleteACommentCommandHandler implements CommandHandlerInterface {
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

  async handle(command: DeleteACommentCommand): Promise<void> {
    const comment: CommentInterface = await this.findOneCommentByUuid(command.uuid);
    if (!comment) throw new DeleteACommentCommandHandlerException(`DeleteACommentCommandHandler - Comment ${command.uuid} not found`);
    await this.updateComment(comment, command);
    await this.updateParent(comment);
    this._logger.info(`DeleteACommentCommandHandler - Comment ${comment.uuid} deleted`);
  }

  private async findOneCommentByUuid(uuid: string): Promise<CommentInterface> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      const message: string = `DeleteACommentCommandHandler - findOneCommentByUuid - Comment ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteACommentCommandHandlerException(message);
    }
  }

  private async updateComment(comment: CommentInterface, command: DeleteACommentCommand): Promise<void> {
    try {
      comment.status = 0;
      comment.updatedBy = command.updatedBy;
      comment.updatedAt = new Date();
      await this._commandRepository.update(comment);
    } catch (e) {
      const message: string = `DeleteACommentCommandHandler - updateComment - Comment ${comment.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteACommentCommandHandlerException(message);
    }
  }

  private async updateParent(comment: CommentInterface): Promise<void> {
    try {
      const ticket: TicketInterface = comment.ticket;
      ticket.updatedBy = comment.updatedBy;
      ticket.updatedAt = comment.updatedAt;
      await this._ticketCommandRepository.update(ticket);
    } catch (e) {
      const message: string = `DeleteACommentCommandHandler - updateParent - Comment ${comment.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteACommentCommandHandlerException(message);
    }
  }
}
