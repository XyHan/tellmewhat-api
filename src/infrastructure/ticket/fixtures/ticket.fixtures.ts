import { TicketInterface } from '../../../domain/model/ticket.model';
import { TicketFactory } from '../../../domain/factory/ticket.factory';
import { TicketEntity } from '../entity/ticket.entity';

export const TICKET_COLLECTION: TicketInterface[] = [
  new TicketFactory(new TicketEntity()).generate(
    '5e4e03a6-6e6f-4b39-a158-307d1e9082d8',
    1,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'toto',
    'toto toto totototototo'
  ),
  new TicketFactory(new TicketEntity()).generate(
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

  public static addTicket(ticket: TicketInterface): void {
    this._ticketCollection.push(new TicketFactory(new TicketEntity()).generate(
      ticket.uuid,
      ticket.status,
      ticket.createdAt,
      ticket.createdBy,
      ticket.updatedAt,
      ticket.updatedBy,
      ticket.subject,
      ticket.description
    ));
  }
}
