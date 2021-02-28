import { Controller, Get, Post } from '@nestjs/common';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';

@Controller('/tickets')
export class TicketController {
  constructor() {}

  @Get('/')
  public async listAll(): Promise<TicketInterface[]> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return [ticket];
  }

  @Get('/:uuid')
  public async get(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }

  @Post('/add')
  public async add(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }

  @Post('/update')
  public async update(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }

  @Post('/delete')
  public async delete(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }
}
