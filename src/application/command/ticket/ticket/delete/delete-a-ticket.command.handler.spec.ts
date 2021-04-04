import { TicketInterface, TicketModel } from '../../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { DeleteATicketCommand } from './delete-a-ticket.command';
import { DeleteATicketCommandHandler } from './delete-a-ticket.command.handler';
import { LoggerMock } from '../../../../../domain/utils/logger/logger.mock';
import { TicketCommandRepositoryMock } from '../../../../../domain/repository/ticket/mock/ticket.command-repository.mock';
import { TicketQueryRepositoryMock } from '../../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { DeleteATicketCommandHandlerException } from './delete-a-ticket.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const UPDATEDBY = 'fa9f9d7d-3303-4b08-ad27-61bd605c9d19';

describe('delete a ticket handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: TicketCommandRepositoryInterface;
  let queryRepository: TicketQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new TicketCommandRepositoryMock();
    queryRepository = new TicketQueryRepositoryMock();
  })

  it ('delete a ticket success', async () => {
    const command = new DeleteATicketCommand(UUID, UPDATEDBY);
    const handler = new DeleteATicketCommandHandler(commandRepository, queryRepository, logger);
    await handler.handle(command);
    const ticket: TicketInterface | null = await queryRepository.findOne(UUID);
    expect(ticket.status).toBe(0);
    expect(ticket.updatedBy).toBe(UPDATEDBY);
  });

  it('delete a ticket error', async () => {
    const command = new DeleteATicketCommand('', '');
    const handler = new DeleteATicketCommandHandler(commandRepository, queryRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(DeleteATicketCommandHandlerException);
  });
});
