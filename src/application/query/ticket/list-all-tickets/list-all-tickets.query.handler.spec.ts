import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';
import { ListAllTicketsQuery } from './list-all-tickets.query';
import { ListAllTicketsQueryHandler } from './list-all-tickets.query.handler';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('list all tickets handler test', () => {
  it ('return a ticket success', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(): Promise<TicketInterface[]> {
        const ticket = new TicketModel();
        ticket.uuid = UUID;
        return Promise.resolve([ticket]);
      },
    };
    const query = new ListAllTicketsQuery(10, 0);
    const handler = new ListAllTicketsQueryHandler(repository);
    const tickets: TicketInterface[] = await handler.handle(query);
    expect(tickets.length).toEqual(1);
    expect(tickets[0].uuid).toEqual(UUID);
  });

  it('list all tickets error', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(): Promise<TicketInterface[]> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
    };
    const query = new ListAllTicketsQuery(10, 0);
    const handler = new ListAllTicketsQueryHandler(repository);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('ListAllTicketsQueryHandler - error: Repository error');
    }
  });
});
