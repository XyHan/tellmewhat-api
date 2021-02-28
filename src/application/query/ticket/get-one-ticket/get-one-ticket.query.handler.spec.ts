import { GetOneTicketQuery } from './get-one-ticket.query';
import { GetOneTicketHandler } from './get-one-ticket.query.handler';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('get one ticket handler test', () => {
  it ('return a ticket success', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne(uuid: string): Promise<TicketInterface> {
        const ticket = new TicketModel();
        ticket.uuid = UUID;
        return Promise.resolve(ticket);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneTicketQuery(UUID);
    const handler = new GetOneTicketHandler(repository);
    const ticket: TicketInterface = await handler.handle(query);
    expect(ticket.uuid).toEqual(UUID);
  });

  it('return a ticket error', async () => {
    const repository: TicketQueryRepositoryInterface = {
      findOne(uuid: string): Promise<TicketInterface> {
        const error: Error = new Error('Not found');
        return Promise.reject(error);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneTicketQuery(UUID);
    const handler = new GetOneTicketHandler(repository);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('GetOneTicketHandler - Ticket 31dd20e0-9a1d-4734-b0af-d9cc3aff4028 error: Not found');
    }
  });
});
