import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../../command-handler.interface';
import { MediaCommandRepositoryInterface } from '../../../../../domain/repository/media/media.command-repository.interface';
import { CreateAMediaCommand} from './create-a-media.command';
import { MediaInterface, MediaModel } from '../../../../../domain/model/ticket/media.model';
import { CreateAMediaCommandHandlerException } from './create-a-media.command.handler.exception';
import { MediaFactory } from '../../../../../domain/factory/media.factory';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';

export class CreateAMediaCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: MediaCommandRepositoryInterface;
  protected readonly _ticketQueryRepository: TicketQueryRepositoryInterface;
  protected readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: MediaCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._ticketQueryRepository = ticketQueryRepository;
    this._ticketCommandRepository = ticketCommandRepository;
    this._logger = logger;
  }

  public async handle(command: CreateAMediaCommand): Promise<void> {
    const ticket: TicketInterface | null = await this.findOneTicketByUuid(command.ticketUuid);
    if (!ticket) throw new CreateAMediaCommandHandlerException(`CreateAMediaCommandHandler - Ticket ${command.ticketUuid} not found.`);
    const media: MediaInterface = this.generateMediaFromCommand(command, ticket);
    await this.registerMedia(media);
    await this.updateParent(media, ticket);
  }

  private generateMediaFromCommand(command: CreateAMediaCommand, ticket: TicketInterface): MediaInterface {
    try {
      return new MediaFactory(new MediaModel()).generate(
        command.uuid,
        new Date(),
        command.createdBy,
        command.originalFilename,
        command.filename,
        command.mimeType,
        ticket
      );
    } catch (e) {
      const message: string = `CreateAMediaCommandHandler - generateMediaFromCommand - Media generation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAMediaCommandHandlerException(message);
    }
  }

  private async registerMedia(media: MediaInterface): Promise<void> {
    try {
      await this._repository.create(media);
      this._logger.info(`CreateAMediaCommandHandler - Media ${media.uuid} registered`);
    } catch (e) {
      const message: string = `CreateAMediaCommandHandler - registerMedia - Media registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAMediaCommandHandlerException(message);
    }
  }

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface | null> {
    try {
      return await this._ticketQueryRepository.findOne(uuid, []);
    } catch (e) {
      const message: string = `CreateAMediaCommandHandler - findOneTicketByUuid - Ticket ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAMediaCommandHandlerException(message);
    }
  }

  private async updateParent(media: MediaInterface, ticket: TicketInterface): Promise<void> {
    try {
      ticket.updatedBy = media.createdBy;
      ticket.updatedAt = media.createdAt;
      await this._ticketCommandRepository.update(ticket);
    } catch (e) {
      const message: string = `CreateAMediaCommandHandler - updateParent - Media ${media.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAMediaCommandHandlerException(message);
    }
  }
}
