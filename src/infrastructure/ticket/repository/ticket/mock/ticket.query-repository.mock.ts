import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketInterface } from '../../../../../domain/model/ticket/ticket.model';
import { TicketRepositoryException } from '../ticket.repository.exception';
import { findAllOptions } from '../../../../../domain/repository/find-all-options.type';
import { TicketFixtures } from '../../../fixtures/ticket.fixtures';

export class TicketQueryRepositoryMock implements TicketQueryRepositoryInterface {
  public async findAll(options: findAllOptions): Promise<[TicketInterface[], number]> {
    try {
      return [TicketFixtures.ticketCollection, TicketFixtures.ticketCollection.length];
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on findAll tickets`;
      throw new TicketRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<TicketInterface | null> {
    try {
      const ticket: TicketInterface | undefined = TicketFixtures.ticketCollection.find((ticket: TicketInterface) => ticket.uuid === uuid);
      return ticket ? ticket : null;
    } catch (e) {
      const message: string = `TicketCommandRepository - Error on findOne ticket '${uuid}'`;
      throw new TicketRepositoryException(message);
    }
  }
}
