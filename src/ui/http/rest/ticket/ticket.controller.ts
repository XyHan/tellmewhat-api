import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query, UsePipes, ValidationPipe
} from '@nestjs/common';
import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneTicketQuery } from '../../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { ListAllTicketsQuery } from '../../../../application/query/ticket/list-all-tickets/list-all-tickets.query';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger.interface';
import { CreateATicketDto } from './dto/create-a-ticket.dto';
import { CreateATicketCommand } from '../../../../application/command/ticket/create/create-a-ticket.command';
import { v4 } from 'uuid';
import { classToClass } from 'class-transformer';
import { BaseController, PaginatedResponse } from '../base.controller';
import { UpdateATicketDto } from './dto/update-a-ticket.dto';
import { UpdateATicketCommand } from '../../../../application/command/ticket/update/update-a-ticket.command';
import { DeleteATicketCommand } from '../../../../application/command/ticket/delete/delete-a-ticket.command';

@Controller('/tickets')
export class TicketController extends BaseController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  protected readonly _logger: LoggerInterface;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
  ) {
    super(logger);
    this._queryBus = queryBus;
    this._commandBus = commandBus;
  }

  @Get('/')
  public async listAll(
    @Query('size') size: string | undefined = '10',
    @Query('page') page: string | undefined = '0',
  ): Promise<PaginatedResponse> {
    try {
      const query = new ListAllTicketsQuery(parseInt(size, 10), parseInt(page, 10));
      const results: [TicketInterface[] , number] = await this._queryBus.execute(query);
      return this.paginateResponse(parseInt(size, 10), parseInt(page, 10), results);
    } catch (e) {
      const message: string = `TicketController - listAll error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('/:uuid')
  public async findOne(@Param() params): Promise<TicketInterface> {
    try {
      return this.findOneTicketByUuid(params.uuid);
    } catch (e) {
      const message: string = `TicketController - get ${params.uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async post(@Body() createATicketDto: CreateATicketDto): Promise<TicketInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateATicketCommand(uuid, createATicketDto.subject, createATicketDto.description); // @todo Refacto with User uuid param
      await this._commandBus.execute(command);
      return await this.findOneTicketByUuid(uuid);
    } catch (e) {
      const message: string = `TicketController - Add ticket error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Put('/:uuid')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async put(
    @Body() updateATicketDto: UpdateATicketDto,
    @Param('uuid') uuid: string,
  ): Promise<TicketInterface> {
    try {
      const updatedBy: string = v4(); // @todo Refacto with User uuid
      const command = new UpdateATicketCommand(
        uuid,
        updateATicketDto.status,
        updatedBy,
        updateATicketDto.description,
        updateATicketDto.subject
      );
      await this._commandBus.execute(command);
      return await this.findOneTicketByUuid(uuid);
    } catch (e) {
      const message: string = `TicketController - Update ${uuid} ticket error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/:uuid')
  @HttpCode(204)
  public async delete(@Param('uuid') uuid: string): Promise<{}> {
    try {
      const command = new DeleteATicketCommand(uuid);
      await this._commandBus.execute(command);
      return {};
    } catch (e) {
      const message: string = `TicketController - Delete ticket ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
  }

  private async findOneTicketByUuid(uuid: string, nullable: boolean = false): Promise<TicketInterface | null> {
    let ticket: TicketInterface | null = null;
    try {
      const query = new GetOneTicketQuery(uuid);
      ticket = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `TicketController - findOneTicket ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!ticket && !nullable) {
      const message: string = `TicketController - Ticket ${uuid} not found`;
      this.http404Response(message);
    }

    return classToClass(ticket);
  }
}
