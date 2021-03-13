import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { CreateATicketCommand} from './create-a-ticket.command';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { CreateATicketCommandHandlerException } from './create-a-ticket.command.handler.exception';
import { TicketFactory } from '../../../../domain/factory/ticket.factory';

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

  async handle(command: CreateATicketCommand): Promise<TicketInterface> {
    try {
      const ticket: TicketInterface = new TicketFactory(new TicketModel()).generate(
        command.uuid,
        1,
        new Date(),
        'c9f63e25-bd06-42ae-993c-20b6b236cb84',
        new Date(),
        'c9f63e25-bd06-42ae-993c-20b6b236cb84',
        command.subject,
        command.description,
      );
      const ticketEntity: TicketInterface = await this._repository.create(ticket);
      this._logger.info(`CreateATicketCommandHandler - Ticket ${ticket.uuid} created`);

      return ticketEntity;
    } catch (e) {
      const message: string = `CreateATicketCommandHandler - Ticket creation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateATicketCommandHandlerException(message);
    }
  }
}
