import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { TicketInterface, TicketModel } from '../../../../domain/model/ticket.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneTicketQuery } from '../../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { ListAllTicketsQuery } from '../../../../application/query/ticket/list-all-tickets/list-all-tickets.query';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { CreateATicketDto } from './dto/create-a-ticket.dto';
import { CreateATicketCommand } from '../../../../application/command/ticket/create/create-a-ticket.command';
import { v4 } from 'uuid';
import { PaginatedResponseInterface } from '../paginated-response.interface';
import { classToClass } from 'class-transformer';

@Controller('/tickets')
export class TicketController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  private readonly _logger: LoggerInterface;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
  ) {
    this._queryBus = queryBus;
    this._commandBus = commandBus;
    this._logger = logger;
  }

  @Get('/')
  public async listAll(@Query() routingQuery): Promise<PaginatedResponseInterface> {
    try {
      const size: number = routingQuery && routingQuery.size ? parseInt(routingQuery.size, 10) : 10;
      const page: number = routingQuery && routingQuery.page ? parseInt(routingQuery.page, 10) : 0;
      const query = new ListAllTicketsQuery(size, page);
      const results: [TicketInterface[] , number] = await this._queryBus.execute(query);
      return this.getPaginatedResponse(size, page, results);
    } catch (e) {
      const message: string = `TicketController - listAll error. Previous: ${e.message}`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:uuid')
  public async get(@Param() params): Promise<TicketInterface> {
    try {
      return this.findOneTicket(params.uuid);
    } catch (e) {
      const message: string = `TicketController - get ${params.uuid} error. Previous: ${e.message}`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  public async add(@Body() createATicketDto: CreateATicketDto): Promise<TicketInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateATicketCommand(uuid, createATicketDto.subject, createATicketDto.description);
      await this._commandBus.execute(command);
      return await this.findOneTicket(uuid);
    } catch (e) {
      const message: string = `TicketController - Add ticket error`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:uuid')
  public async update(@Param() params): Promise<TicketInterface> {
    try {
      const ticket: TicketInterface = new TicketModel();
      ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
      return ticket;
    } catch (e) {
      const message: string = `TicketController - Update ${params.uuid} ticket error`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:uuid')
  public async delete(@Param() params): Promise<TicketInterface> {
    try {
      const ticket: TicketInterface = new TicketModel();
      ticket.uuid = '94b671e9-9990-488e-b92b-5770eafec5f7';
      return ticket;
    } catch (e) {
      const message: string = `TicketController - Delete ticket ${params.uuid} error`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async findOneTicket(uuid: string): Promise<TicketInterface> {
    let ticket: TicketInterface | null = null;
    try {
      const query = new GetOneTicketQuery(uuid);
      ticket = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `TicketController - findOneTicket ${uuid} error. Previous: ${e.message}`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!ticket) {
      const message: string = `TicketController - Ticket ${uuid} not found`;
      this._logger.error(message);
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
    return classToClass(ticket);
  }

  protected getPaginatedResponse(size: number, page: number, results: [TicketInterface[] , number]): PaginatedResponseInterface {
    const total: number = results && results.length > 1 && typeof results[1] === 'number' ? results[1] : 0;
    const tickets: TicketInterface[] = results && results.length > 1 ? results[0].map((ticket: TicketInterface) => classToClass(ticket)) : [];
    const pages: number = Math.ceil(total / size - 1);
    return { page, pages, total, tickets };
  }
}
