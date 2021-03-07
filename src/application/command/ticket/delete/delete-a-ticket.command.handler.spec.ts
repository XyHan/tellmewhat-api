import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { DeleteATicketCommand } from './delete-a-ticket.command';
import { DeleteATicketCommandHandler } from './delete-a-ticket.command.handler';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('delete a ticket handler test', () => {
  it ('delete a ticket success', async () => {
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
      delete(ticket: TicketInterface): Promise<TicketInterface> {
        return Promise.resolve(ticket);
      },
      create: jest.fn(),
      update: jest.fn(),
    };
    const command = new DeleteATicketCommand(UUID);
    const handler = new DeleteATicketCommandHandler(commandRepository, queryRepository, logger);
    const ticket: TicketInterface = await handler.handle(command);
    expect(ticket.uuid).toBe(UUID);
  });

  it('delete a ticket error', async () => {
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
      delete(ticket: TicketInterface): Promise<TicketInterface> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
      create: jest.fn(),
      update: jest.fn(),
    };
    const command = new DeleteATicketCommand('');
    const handler = new DeleteATicketCommandHandler(commandRepository, queryRepository, logger);
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e.message).toEqual('DeleteATicketCommandHandler - Ticket deletion error: Repository error');
    }
  });
});
