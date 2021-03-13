import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { UpdateATicketCommand } from './update-a-ticket.command';
import { UpdateATicketCommandHandler } from './update-a-ticket.command.handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { TicketCommandRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.command-repository.mock';
import { TicketQueryRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { UpdateATicketCommandHandlerException } from './update-a-ticket.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const STATUS = 2;
const UPDATED_BY = '31dd20e0-9a1d-4734-xxxx-d9cc3aff4028';
const SUBJECT = 'Yoda';
const DESCRIPTION = 'N\'essaie pas! Fais-le ou ne le fais pas! Il n\'y a pas d\'essai.';

describe('update a ticket handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: TicketCommandRepositoryInterface;
  let queryRepository: TicketQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new TicketCommandRepositoryMock();
    queryRepository = new TicketQueryRepositoryMock();
  })

  it ('update a ticket success', async () => {
    const command = new UpdateATicketCommand(UUID, STATUS, UPDATED_BY, SUBJECT, DESCRIPTION);
    const handler = new UpdateATicketCommandHandler(commandRepository, queryRepository, logger);
    await handler.handle(command);
    const ticket: TicketInterface = await queryRepository.findOne(UUID);
    expect(ticket.uuid).toBe(UUID);
    expect(ticket.status).toBe(STATUS);
    expect(ticket.createdAt).toBeDefined();
    expect(ticket.createdBy).toBeDefined();
    expect(ticket.updatedAt).toBeDefined();
    expect(ticket.updatedBy).toBe(UPDATED_BY);
    expect(ticket.subject).toEqual(SUBJECT);
    expect(ticket.description).toEqual(DESCRIPTION);
  });

  it('create a ticket error', async () => {
    const command = new UpdateATicketCommand('', 2, '', '', '');
    const handler = new UpdateATicketCommandHandler(commandRepository, queryRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(UpdateATicketCommandHandlerException);
  });
});
