import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { DeleteATicketCommandHandlerException } from './delete-a-ticket.command.handler.exception';
import { DeleteATicketCommand } from './delete-a-ticket.command';

export class DeleteATicketCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: TicketCommandRepositoryInterface;
  protected readonly _queryRepository: TicketQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: TicketCommandRepositoryInterface,
    queryRepository: TicketQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  async handle(command: DeleteATicketCommand): Promise<TicketInterface> {
    try {
      const ticket: TicketInterface = await this.findOneTicketByUuid(command.uuid);
      const ticketEntity: TicketInterface = await this._commandRepository.delete(ticket);
      this._logger.info(`DeleteATicketCommandHandler - Ticket ${ticket.uuid} deleted`);

      return ticketEntity;
    } catch (e) {
      const message: string = `DeleteATicketCommandHandler - Ticket deletion error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteATicketCommandHandlerException(message);
    }
  }

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      throw new DeleteATicketCommandHandlerException(e.message);
    }
  }
}
