import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketInterface } from '../../../../domain/model/ticket.model';

describe('TicketController', () => {
  let ticketController: TicketController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
    }).compile();

    ticketController = app.get<TicketController>(TicketController);
  });

  describe('root', () => {
    it('GET - LISTALL - should return an array of TicketInterface', async () => {
      const tickets: TicketInterface[] = await ticketController.listAll()
      expect(tickets.length).toBe(1);
      expect(tickets[0].uuid).toBe('94b671e9-9990-488e-b92b-5770eafec5f7');
    });

    it('GET - GET - should return a TicketInterface', async () => {
      const ticket: TicketInterface = await ticketController.get()
      expect(ticket.uuid).toBe('94b671e9-9990-488e-b92b-5770eafec5f7');
    });

    it('POST - ADD - should return a TicketInterface', async () => {
      const ticket: TicketInterface = await ticketController.add()
      expect(ticket.uuid).toBe('94b671e9-9990-488e-b92b-5770eafec5f7');
    });

    it('POST - UPDATE - should return a TicketInterface', async () => {
      const ticket: TicketInterface = await ticketController.update()
      expect(ticket.uuid).toBe('94b671e9-9990-488e-b92b-5770eafec5f7');
    });

    it('POST - DELETE - should return a TicketInterface', async () => {
      const ticket: TicketInterface = await ticketController.delete()
      expect(ticket.uuid).toBe('94b671e9-9990-488e-b92b-5770eafec5f7');
    });
  });
});
