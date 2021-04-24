import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { CreateATicketCommand} from './create-a-ticket.command';
import { TicketInterface, TicketModel } from '../../../../../domain/model/ticket/ticket.model';
import { CreateATicketCommandHandlerException } from './create-a-ticket.command.handler.exception';
import { TicketFactory } from '../../../../../domain/factory/ticket.factory';

export class CreateATicketCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: TicketCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  public async handle(command: CreateATicketCommand): Promise<void> {
    const ticket: TicketInterface = this.generateTicketFromCommand(command);
    await this.registerTicket(ticket);
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
        null,
        command.type,
        command.project
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
}
