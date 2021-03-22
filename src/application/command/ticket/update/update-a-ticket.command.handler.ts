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

  async handle(command: UpdateATicketCommand): Promise<void> {
    const ticket: TicketInterface | null = await this.findOneTicketByUuid(command.uuid);
    if (!ticket) throw new UpdateATicketCommandHandlerException(`UpdateATicketCommandHandler - Ticket ${command.uuid} not found`);
    const updatedTicket: TicketInterface = this.updateTicketFromCommand(command, ticket);
    await this.updateTicket(updatedTicket);
  }

  private updateTicketFromCommand(command: UpdateATicketCommand, ticket: TicketInterface): TicketInterface {
    try {
      return new TicketFactory(ticket).generate(
        command.uuid,
        command.status,
        ticket.createdAt,
        ticket.createdBy,
        new Date(),
        command.updatedBy,
        command.subject,
        command.description,
      );
    } catch (e) {
      const message: string = `UpdateATicketCommandHandler - updateTicketFromCommand - Ticket update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateATicketCommandHandlerException(message);
    }
  }

  private async updateTicket(updatedTicket: TicketInterface): Promise<void> {
    try {
      await this._commandRepository.update(updatedTicket);
      this._logger.info(`UpdateATicketCommandHandler - updateTicket - Ticket ${updatedTicket.uuid} updated`);
    } catch (e) {
      const message: string = `UpdateATicketCommandHandler - updateTicket - Ticket update error: ${e.message}`;
      this._logger.error(message);
      throw new UpdateATicketCommandHandlerException(message);
    }
  }

  private async findOneTicketByUuid(uuid: string): Promise<TicketInterface | null> {
    try {
      return await this._queryRepository.findOne(uuid);
    } catch (e) {
      throw new UpdateATicketCommandHandlerException(e.message);
    }
  }
}
