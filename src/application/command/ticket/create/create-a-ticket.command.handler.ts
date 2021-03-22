import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { CreateATicketCommand} from './create-a-ticket.command';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { CreateATicketCommandHandlerException } from './create-a-ticket.command.handler.exception';
import { TicketFactory } from '../../../../domain/factory/ticket.factory';
import { HistoryCommandRepositoryInterface } from '../../../../domain/repository/history/history.command-repository.interface';
import { HistoryInterface, HistoryModel } from '../../../../domain/model/ticket/history.model';
import { HistoryFactory } from '../../../../domain/factory/history.factory';

export class CreateATicketCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: TicketCommandRepositoryInterface;
  protected readonly _historyRepository: HistoryCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: TicketCommandRepositoryInterface,
    historyRepository: HistoryCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._historyRepository = historyRepository;
    this._logger = logger;
  }

  public async handle(command: CreateATicketCommand): Promise<void> {
    const ticket: TicketInterface = this.generateTicketFromCommand(command);
    await this.registerTicket(ticket);
    await this.registerHistory(ticket);
  }

  private generateTicketFromCommand(command: CreateATicketCommand): TicketInterface {
    try {
      return new TicketFactory(new TicketModel()).generate(
        command.uuid,
        1,
        new Date(),
        command.createdBy,
        new Date(),
        command.createdBy,
        command.subject,
        command.description,
      );
    } catch (e) {
      const message: string = `CreateATicketCommandHandler - generateTicketFromCommand - Ticket generation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateATicketCommandHandlerException(message);
    }
  }

  private async registerTicket(ticket: TicketInterface): Promise<void> {
    try {
      await this._repository.create(ticket);
      this._logger.info(`CreateATicketCommandHandler - Ticket ${ticket.uuid} registered`);
    } catch (e) {
      const message: string = `CreateATicketCommandHandler - registerTicket - Ticket registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateATicketCommandHandlerException(message);
    }
  }

  private async registerHistory(ticket: TicketInterface): Promise<void> {
    try {
      const history: HistoryInterface = new HistoryFactory(new HistoryModel()).generate(
        ticket,
        1,
        ticket.uuid,
        null,
        ticket.createdBy,
        ticket.createdAt,
      );
      await this._historyRepository.create(history);
      this._logger.info(`CreateATicketCommandHandler - History registered for ticket ${ticket.uuid}`);
    } catch (e) {
      const message: string = `CreateATicketCommandHandler - registerHistory - Ticket ${ticket.uuid} history registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateATicketCommandHandlerException(message);
    }
  }
}
