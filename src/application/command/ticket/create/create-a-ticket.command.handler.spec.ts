import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { CreateATicketCommand } from './create-a-ticket.command';
import { CreateATicketCommandHandler } from './create-a-ticket.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const SUBJECT = 'Yoda';
const DESCRIPTION = 'N\'essaie pas! Fais-le ou ne le fais pas! Il n\'y a pas d\'essai.';

describe('create a ticket handler test', () => {
  it ('create a ticket success', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const repository: TicketCommandRepositoryInterface = {
      create(ticket: TicketInterface): Promise<TicketInterface> {
        return Promise.resolve(ticket);
      },
      update: jest.fn(),
      delete: jest.fn(),
    };
    const command = new CreateATicketCommand(UUID, SUBJECT, DESCRIPTION);
    const handler = new CreateATicketCommandHandler(repository, logger);
    const ticket: TicketInterface = await handler.handle(command);
    expect(ticket.uuid).toBeDefined();
    expect(ticket.status).toBe(1);
    expect(ticket.createdAt).toBeDefined();
    expect(ticket.createdBy).toBeDefined();
    expect(ticket.updatedAt).toBeDefined();
    expect(ticket.updatedBy).toBeDefined();
    expect(ticket.subject).toEqual(SUBJECT);
    expect(ticket.description).toEqual(DESCRIPTION);
  });

  it('create a ticket error', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const repository: TicketCommandRepositoryInterface = {
      create(ticket: TicketInterface): Promise<TicketInterface> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
      update: jest.fn(),
      delete: jest.fn(),
    };
    const command = new CreateATicketCommand('', '', '');
    const handler = new CreateATicketCommandHandler(repository, logger);
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e.message).toEqual('CreateATicketCommandHandler - Ticket creation error: Repository error');
    }
  });
});
