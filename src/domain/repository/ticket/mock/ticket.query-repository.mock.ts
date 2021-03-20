import { TicketQueryRepositoryInterface } from '../ticket.query-repository.interface';
import { TicketInterface } from '../../../model/ticket/ticket.model';
import { TicketRepositoryException } from '../ticket.repository.exception';
import { findAllOptions } from '../../find-all-options.type';
import { TicketFixtures } from '../../../fixtures/ticket.fixtures';

export class TicketQueryRepositoryMock implements TicketQueryRepositoryInterface {
  public async findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
    try {
      return Promise.resolve([TicketFixtures.ticketCollection, TicketFixtures.ticketCollection.length]);
    } catch (e) {
      const message: string = `TicketQueryRepository - Error on findAll tickets`;
      throw new TicketRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface | null> {
    try {
      const ticket: TicketInterface | undefined = TicketFixtures.ticketCollection.find((ticket: TicketInterface) => ticket.uuid === uuid);
      return ticket ? Promise.resolve(ticket) : Promise.resolve(null);
    } catch (e) {
      const message: string = `TicketQueryRepository - Error on findOne ticket '${uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }
}
