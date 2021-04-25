import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
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

  async handle(command: DeleteATicketCommand): Promise<void> {
    const ticket: TicketInterface = await this.findOneTicketByUuid(command.uuid);
    if (!ticket) throw new DeleteATicketCommandHandlerException(`DeleteATicketCommandHandler - Ticket ${command.uuid} not found`);
    await this.updateTicket(ticket, command);
    this._logger.info(`DeleteATicketCommandHandler - Ticket ${ticket.uuid} deleted`);
  }

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface> {
    try {
      return await this._queryRepository.findOne(uuid, []);
    } catch (e) {
      const message: string = `DeleteATicketCommandHandler - findOneTicketByUuid - Ticket ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteATicketCommandHandlerException(message);
    }
  }

  private async updateTicket(ticket: TicketInterface, command: DeleteATicketCommand): Promise<void> {
    try {
      ticket.status = 0;
      ticket.updatedBy = command.updatedBy;
      ticket.updatedAt = new Date();
      await this._commandRepository.update(ticket);
    } catch (e) {
      const message: string = `DeleteATicketCommandHandler - updateTicket - Ticket ${ticket.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteATicketCommandHandlerException(message);
    }
  }
}
