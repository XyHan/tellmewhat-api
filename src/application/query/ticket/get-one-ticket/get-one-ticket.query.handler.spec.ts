import { GetOneTicketQuery } from './get-one-ticket.query';
import { GetOneTicketQueryHandler } from './get-one-ticket.query.handler';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket/ticket.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('get one ticket handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

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
    const handler = new GetOneTicketQueryHandler(repository, logger);
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
    const handler = new GetOneTicketQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('GetOneTicketQueryHandler - Ticket 31dd20e0-9a1d-4734-b0af-d9cc3aff4028 error: Not found');
    }
  });
});
