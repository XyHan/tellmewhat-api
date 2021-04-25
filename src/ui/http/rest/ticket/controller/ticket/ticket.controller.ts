import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { TicketInterface } from '../../../../../../domain/model/ticket/ticket.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneTicketQuery } from '../../../../../../application/query/ticket/ticket/get-one-ticket/get-one-ticket.query';
import { ListAllTicketsQuery } from '../../../../../../application/query/ticket/ticket/list-all-tickets/list-all-tickets.query';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { CreateATicketDto } from '../../dto/ticket/create-a-ticket.dto';
import { CreateATicketCommand } from '../../../../../../application/command/ticket/ticket/create/create-a-ticket.command';
import { v4 } from 'uuid';
import { plainToClass} from 'class-transformer';
import { BaseController, PaginatedResponse } from '../../../base.controller';
import { UpdateATicketDto } from '../../dto/ticket/update-a-ticket.dto';
import { UpdateATicketCommand } from '../../../../../../application/command/ticket/ticket/update/update-a-ticket.command';
import { DeleteATicketCommand } from '../../../../../../application/command/ticket/ticket/delete/delete-a-ticket.command';
import { TicketEntity } from '../../../../../../infrastructure/ticket/entity/ticket.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { TicketTransformer } from '../../../../../../infrastructure/ticket/transformer/ticket.transformer';

@Controller('/tickets')
export class TicketController extends BaseController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  protected readonly _logger: LoggerInterface;
  private readonly _ticketTransformer: TicketTransformer;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
    @Inject(TicketTransformer) ticketTransformer: TicketTransformer,
  ) {
    super(logger);
    this._queryBus = queryBus;
    this._commandBus = commandBus;
    this._ticketTransformer = ticketTransformer;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async listAll(
    @Query('size') size: string | undefined = '10',
    @Query('page') page: string | undefined = '0',
    @Query('sources') sources: string | undefined,
    @Query('sort') sort: string | undefined,
    @Query('search') search: string | undefined,
    @Query('type') type: string | undefined,
    @Query('project') project: string | undefined,
    @Query('author') author: string | undefined,
  ): Promise<PaginatedResponse<TicketInterface>> {
    try {
      const filters: Map<string, string> = new Map([
        ['search', search],
        ['type', type],
        ['project', project],
        ['author', author],
      ]);
      const query = new ListAllTicketsQuery(
        parseInt(size, 10),
        parseInt(page, 10),
        sources?.split(','),
        sort || 'ASC',
        filters
      );
      const results: [TicketInterface[] , number] = await this._queryBus.execute(query);
      const collection: TicketInterface[] = await Promise.all(
        results[0].map(async (ticket: TicketInterface) => await this._ticketTransformer.transform(ticket))
      );
      return this.paginateResponse(
        parseInt(size, 10),
        parseInt(page, 10),
        collection,
        results[1]
      );
    } catch (e) {
      const message: string = `TicketController - listAll error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async findOne(@Param() params): Promise<TicketInterface> {
    try {
      return this.findOneTicketByUuid(params.uuid);
    } catch (e) {
      const message: string = `TicketController - get ${params.uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async post(
    @Body() createATicketDto: CreateATicketDto,
    @CurrentUser() user: UserInterface,
  ): Promise<TicketInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateATicketCommand(uuid, createATicketDto.subject, user.uuid, createATicketDto.type, createATicketDto.project);
      await this._commandBus.execute(command);
      return await this.findOneTicketByUuid(uuid);
    } catch (e) {
      const message: string = `TicketController - Add ticket error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async put(
    @Body() updateATicketDto: UpdateATicketDto,
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<TicketInterface> {
    try {
      const command = new UpdateATicketCommand(
        uuid,
        updateATicketDto.status,
        user.uuid,
        updateATicketDto.description,
        updateATicketDto.subject,
        updateATicketDto.type,
        updateATicketDto.project
      );
      await this._commandBus.execute(command);
      return await this.findOneTicketByUuid(uuid);
    } catch (e) {
      const message: string = `TicketController - Update ${uuid} ticket error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async delete(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<TicketInterface> {
    try {
      const command = new DeleteATicketCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
      return await this.findOneTicketByUuid(uuid);
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

    return plainToClass(TicketEntity, ticket);
  }
}
