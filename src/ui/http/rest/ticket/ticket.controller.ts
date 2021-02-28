import {Controller, Delete, Get, Inject, Post, Put} from '@nestjs/common';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';
import {IQuery, IQueryBus, QueryBus} from "@nestjs/cqrs";
import {GetOneTicketQuery} from "../../../../application/query/ticket/get-one-ticket/get-one-ticket.query";

@Controller('/tickets')
export class TicketController {
  private readonly _queryBus: IQueryBus;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus
  ) {
    this._queryBus = queryBus;
  }

  @Get('/')
  public async listAll(): Promise<TicketInterface[]> {
    const ticket: TicketInterface = new TicketModel();
    ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
    return [ticket];
  }

  @Get('/:uuid')
  public async get(uuid: string): Promise<TicketInterface> {
    const query = new GetOneTicketQuery(uuid);
    return await this._queryBus.execute(query);
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
