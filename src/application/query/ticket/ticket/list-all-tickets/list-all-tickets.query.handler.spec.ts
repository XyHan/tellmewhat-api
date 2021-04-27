import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface, TicketModel } from '../../../../../domain/model/ticket/ticket.model';
import { ListAllTicketsQuery } from './list-all-tickets.query';
import { ListAllTicketsQueryHandler } from './list-all-tickets.query.handler';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../../domain/utils/logger/logger.mock';
import { findAllOptions } from '../../../../../domain/repository/find-all-options.type';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('list all tickets handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a ticket success', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
        const ticket = new TicketModel();
        ticket.uuid = UUID;
        return Promise.resolve([[ticket], 1]);
      },
    };
    const query = new ListAllTicketsQuery(10, 0, [], 'ASC', new Map());
    const handler = new ListAllTicketsQueryHandler(repository, logger);
    const tickets: [TicketInterface[], number] = await handler.handle(query);
    expect(tickets[0].length).toEqual(1);
    expect(tickets[0][0].uuid).toEqual(UUID);
  });

  it('list all tickets error', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
    };
    const query = new ListAllTicketsQuery(10, 0, [], 'ASC', new Map());
    const handler = new ListAllTicketsQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('ListAllTicketsQueryHandler - error: Repository error');
    }
  });
});
