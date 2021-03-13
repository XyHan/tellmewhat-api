import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { TicketFactory } from '../../../../domain/factory/ticket.factory';
import { UpdateATicketCommand } from './update-a-ticket.command';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { UpdateATicketCommandHandlerException } from './update-a-ticket.command.handler.exception';

export class UpdateATicketCommandHandler implements CommandHandlerInterface {
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

  async handle(command: UpdateATicketCommand): Promise<TicketInterface> {
    try {
      const ticket: TicketInterface = await this.findOneTicketByUuid(command.uuid);
      const updatedTicket: TicketInterface = new TicketFactory(ticket).generate(
        command.uuid,
        command.status,
        ticket.createdAt,
        ticket.createdBy,
        new Date(),
        command.updatedBy,
        command.subject,
        command.description,
      );
      const ticketEntity: TicketInterface = await this._commandRepository.update(updatedTicket);
      this._logger.info(`UpdateATicketCommandHandler - Ticket ${ticket.uuid} updated`);

      return ticketEntity;
    } catch (e) {
      const message: string = `UpdateATicketCommandHandler - Ticket update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateATicketCommandHandlerException(message);
    }
  }

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      throw new UpdateATicketCommandHandlerException(e.message);
    }
  }
}
