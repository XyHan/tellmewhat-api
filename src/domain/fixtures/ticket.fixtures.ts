import { TicketInterface, TicketModel } from '../model/ticket/ticket.model';
import { TicketFactory } from '../factory/ticket.factory';

export const TICKET_COLLECTION: TicketInterface[] = [
  new TicketFactory(new TicketModel()).generate(
    '5e4e03a6-6e6f-4b39-a158-307d1e9082d8',
    1,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'toto',
    'toto toto totototototo'
  ),
  new TicketFactory(new TicketModel()).generate(
    '0d66db91-4441-4563-967c-797d767c7288',
    1,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'toto',
    'toto toto totototototo'
  )
];

export class TicketFixtures {
  private static readonly _ticketCollection: TicketInterface[] = TICKET_COLLECTION;

  public static get ticketCollection(): TicketInterface[] {
    return this._ticketCollection;
  }

  public static deleteTicket(ticketToDelete: TicketInterface): void {
    const index: number = this._ticketCollection.findIndex((ticket: TicketInterface) => ticket.uuid === ticketToDelete.uuid);
    if (index) this._ticketCollection.splice(index, 1);
  }

  public static saveTicket(ticketToSave: TicketInterface): void {
    const userIndex: number = this._ticketCollection.findIndex((ticket: TicketInterface) => ticket.uuid === ticketToSave.uuid);
    if (userIndex) this._ticketCollection.splice(userIndex, 1);
    this._ticketCollection.push(ticketToSave);
  }
}
