import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { UpdateATicketCommand } from './update-a-ticket.command';
import { UpdateATicketCommandHandler } from './update-a-ticket.command.handler';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const STATUS = 2;
const UPDATED_BY = '31dd20e0-9a1d-4734-xxxx-d9cc3aff4028';
const SUBJECT = 'Yoda';
const DESCRIPTION = 'N\'essaie pas! Fais-le ou ne le fais pas! Il n\'y a pas d\'essai.';

describe('update a ticket handler test', () => {
  it ('update a ticket success', async () => {
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const queryRepository: TicketQueryRepositoryInterface = {
      findOne(uuid: string): Promise<TicketInterface> {
        const ticket: TicketInterface = new TicketModel();
        ticket.uuid = uuid;
        ticket.createdAt = new Date();
        ticket.createdBy = uuid;
        return Promise.resolve(ticket);
      },
      findAll: jest.fn(),
    };
    const commandRepository: TicketCommandRepositoryInterface = {
      update(ticket: TicketInterface): Promise<TicketInterface> {
        return Promise.resolve(ticket);
      },
      create: jest.fn(),
      delete: jest.fn(),
    };
    const command = new UpdateATicketCommand(UUID, STATUS, UPDATED_BY, SUBJECT, DESCRIPTION);
    const handler = new UpdateATicketCommandHandler(commandRepository, queryRepository, logger);
    const ticket: TicketInterface = await handler.handle(command);
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
    const logger: LoggerInterface = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };
    const queryRepository: TicketQueryRepositoryInterface = {
      findOne(uuid: string): Promise<TicketInterface> {
        const ticket: TicketInterface = new TicketModel();
        ticket.uuid = uuid;
        return Promise.resolve(ticket);
      },
      findAll: jest.fn(),
    };
    const commandRepository: TicketCommandRepositoryInterface = {
      update(ticket: TicketInterface): Promise<TicketInterface> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
      create: jest.fn(),
      delete: jest.fn(),
    };
    const command = new UpdateATicketCommand('', 2, '', '', '');
    const handler = new UpdateATicketCommandHandler(commandRepository, queryRepository, logger);
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e.message).toEqual('UpdateATicketCommandHandler - Ticket update error: Repository error');
    }
  });
});
