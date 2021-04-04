import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../../command-handler.interface';
import { CommentCommandRepositoryInterface } from '../../../../../domain/repository/comment/comment.command-repository.interface';
import { CreateACommentCommand} from './create-a-comment.command';
import { CommentInterface, CommentModel } from '../../../../../domain/model/ticket/comment.model';
import { CreateACommentCommandHandlerException } from './create-a-comment.command.handler.exception';
import { CommentFactory } from '../../../../../domain/factory/comment.factory';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';

export class CreateACommentCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: CommentCommandRepositoryInterface;
  protected readonly _ticketQueryRepository: TicketQueryRepositoryInterface;
  protected readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: CommentCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._ticketQueryRepository = ticketQueryRepository;
    this._ticketCommandRepository = ticketCommandRepository;
    this._logger = logger;
  }

  public async handle(command: CreateACommentCommand): Promise<void> {
    const ticket: TicketInterface | null = await this.findOneTicketByUuid(command.ticketUuid);
    if (!ticket) throw new CreateACommentCommandHandlerException(`CreateACommentCommandHandler - Ticket ${command.ticketUuid} not found.`);
    const comment: CommentInterface = this.generateCommentFromCommand(command, ticket);
    await this.registerComment(comment);
    await this.updateParent(comment, ticket);
  }

  private generateCommentFromCommand(command: CreateACommentCommand, ticket: TicketInterface): CommentInterface {
    try {
      return new CommentFactory(new CommentModel()).generate(
        command.uuid,
        1,
        new Date(),
        command.createdBy,
        new Date(),
        command.createdBy,
        command.content,
        ticket
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

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface | null> {
    try {
      return await this._ticketQueryRepository.findOne(uuid);
    } catch (e) {
      const message: string = `CreateACommentCommandHandler - findOneTicketByUuid - Ticket ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new CreateACommentCommandHandlerException(message);
    }
  }

  private async updateParent(comment: CommentInterface, ticket: TicketInterface): Promise<void> {
    try {
      ticket.updatedBy = comment.updatedBy;
      ticket.updatedAt = comment.updatedAt;
      await this._ticketCommandRepository.update(ticket);
    } catch (e) {
      const message: string = `CreateACommentCommandHandler - updateParent - Comment ${comment.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new CreateACommentCommandHandlerException(message);
    }
  }
}
