import {Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put} from '@nestjs/common';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';
import { IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneTicketQuery } from '../../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { ListAllTicketsQuery } from '../../../../application/query/ticket/list-all-tickets/list-all-tickets.query';

@Controller('/tickets')
export class TicketController {
  private readonly _queryBus: IQueryBus;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus
  ) {
    this._queryBus = queryBus;
  }

  @Get('/')
  public async listAll(): Promise<{ total: number, tickets: TicketInterface[] }> {
    try {
      const query = new ListAllTicketsQuery(10, 0);
      const results: [TicketInterface[] , number] = await this._queryBus.execute(query);
      const total: number = results && results.length > 2 && typeof results[1] === 'number' ? results[1] : 0;
      const tickets: TicketInterface[] = results && results.length > 2 ? results[0] : [];
      return { total, tickets }
    } catch (e) {
      throw new HttpException(`TicketController - listAll error. Previous: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:uuid')
  public async get(@Param() params): Promise<TicketInterface> {
    let ticket: TicketInterface | null = null;
    try {
      const query = new GetOneTicketQuery(params.uuid);
      ticket = await this._queryBus.execute(query);
    } catch (e) {
      throw new HttpException(
        `TicketController - get ${params.uuid} error. Previous: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    if (!ticket) throw new HttpException(`Ticket ${params.uuid} not found`, HttpStatus.NOT_FOUND);
    return ticket;
  }

  @Post('/')
  public async add(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }

  @Put('/:uuid')
  public async update(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }

  @Delete('/:uuid')
  public async delete(): Promise<TicketInterface> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return ticket;
  }
}
