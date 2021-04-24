import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { CreateATicketCommand } from './create-a-ticket.command';
import { CreateATicketCommandHandler } from './create-a-ticket.command.handler';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../../domain/utils/logger/logger.mock';
import { TicketCommandRepositoryMock } from '../../../../../domain/repository/ticket/mock/ticket.command-repository.mock';
import { TicketQueryRepositoryMock } from '../../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { CreateATicketCommandHandlerException } from './create-a-ticket.command.handler.exception';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const SUBJECT = 'Yoda';
const CREATEDBY = '08ee082c-be8c-4a50-8533-83c7e774cbff';
const TYPE = 'feature';
const PROJECT = 'Project T';

describe('create a ticket handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: TicketCommandRepositoryInterface;
  let queryRepository: TicketQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new TicketCommandRepositoryMock();
    queryRepository = new TicketQueryRepositoryMock();
  })

  it ('create a ticket success', async () => {
    const command = new CreateATicketCommand(UUID, SUBJECT, CREATEDBY, TYPE, PROJECT);
    const handler = new CreateATicketCommandHandler(commandRepository, logger);
    await handler.handle(command);
    const ticket: TicketInterface | null = await queryRepository.findOne(UUID);
    expect(ticket.uuid).toBe(UUID);
    expect(ticket.status).toBe(1);
    expect(ticket.createdAt).toBeDefined();
    expect(ticket.createdBy).toBe(CREATEDBY);
    expect(ticket.updatedAt).toBeDefined();
    expect(ticket.updatedBy).toBe(CREATEDBY);
    expect(ticket.subject).toEqual(SUBJECT);
    expect(ticket.description).toBeNull();
  });

  it('create a ticket error', async () => {
    const command = new CreateATicketCommand('', '', '', '', '');
    const handler = new CreateATicketCommandHandler(commandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(CreateATicketCommandHandlerException);
  });
});
