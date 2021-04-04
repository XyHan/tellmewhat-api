import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../../command-handler.interface';
import { MediaCommandRepositoryInterface } from '../../../../../domain/repository/media/media.command-repository.interface';
import { MediaInterface } from '../../../../../domain/model/ticket/media.model';
import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';
import { DeleteAMediaCommandHandlerException } from './delete-a-media.command.handler.exception';
import { DeleteAMediaCommand } from './delete-a-media.command';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';

export class DeleteAMediaCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: MediaCommandRepositoryInterface;
  protected readonly _queryRepository: MediaQueryRepositoryInterface;
  protected readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: MediaCommandRepositoryInterface,
    queryRepository: MediaQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._ticketCommandRepository = ticketCommandRepository;
    this._logger = logger;
  }

  async handle(command: DeleteAMediaCommand): Promise<void> {
    const media: MediaInterface = await this.findOneMediaByUuid(command.uuid);
    if (!media) throw new DeleteAMediaCommandHandlerException(`DeleteAMediaCommandHandler - Media ${command.uuid} not found`);
    await this.deleteMedia(media);
    await this.updateParent(media, command);
    this._logger.info(`DeleteAMediaCommandHandler - Media ${media.uuid} deleted`);
  }

  private async findOneMediaByUuid(uuid: string): Promise<MediaInterface> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      const message: string = `DeleteAMediaCommandHandler - findOneMediaByUuid - Media ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAMediaCommandHandlerException(message);
    }
  }

  private async deleteMedia(media: MediaInterface): Promise<void> {
    try {
      await this._commandRepository.delete(media);
    } catch (e) {
      const message: string = `DeleteAMediaCommandHandler - updateMedia - Media ${media.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAMediaCommandHandlerException(message);
    }
  }

  private async updateParent(media: MediaInterface, command: DeleteAMediaCommand): Promise<void> {
    try {
      const ticket: TicketInterface = media.ticket;
      ticket.updatedBy = command.updatedBy;
      ticket.updatedAt = new Date();
      await this._ticketCommandRepository.update(ticket);
    } catch (e) {
      const message: string = `DeleteAMediaCommandHandler - updateParent - Media ${media.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAMediaCommandHandlerException(message);
    }
  }
}
