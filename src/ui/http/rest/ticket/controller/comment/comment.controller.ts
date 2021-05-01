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
import { CommentInterface } from '../../../../../../domain/model/ticket/comment.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneCommentQuery } from '../../../../../../application/query/ticket/comment/get-one-comment/get-one-comment.query';
import { ListAllCommentsQuery } from '../../../../../../application/query/ticket/comment/list-all-comments/list-all-comments.query';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { CreateACommentDto } from '../../dto/comment/create-a-comment.dto';
import { CreateACommentCommand } from '../../../../../../application/command/ticket/comment/create/create-a-comment.command';
import { v4 } from 'uuid';
import { plainToClass} from 'class-transformer';
import { BaseController, PaginatedResponse } from '../../../base.controller';
import { UpdateACommentDto } from '../../dto/comment/update-a-comment.dto';
import { UpdateACommentCommand } from '../../../../../../application/command/ticket/comment/update/update-a-comment.command';
import { DeleteACommentCommand } from '../../../../../../application/command/ticket/comment/delete/delete-a-comment.command';
import { CommentEntity } from '../../../../../../infrastructure/ticket/entity/comment.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { CommentTransformer } from '../../../../../../infrastructure/ticket/transformer/comment/comment.transformer';
import { TicketInterface } from '../../../../../../domain/model/ticket/ticket.model';
import { GetOneTicketQuery } from '../../../../../../application/query/ticket/ticket/get-one-ticket/get-one-ticket.query';

@Controller('/tickets/:ticketUuid/comments')
export class CommentController extends BaseController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  protected readonly _logger: LoggerInterface;
  private readonly _commentTransformer: CommentTransformer;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
    @Inject(CommentTransformer) commentTransformer: CommentTransformer
  ) {
    super(logger);
    this._queryBus = queryBus;
    this._commandBus = commandBus;
    this._commentTransformer = commentTransformer;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async listAll(
    @Param('ticketUuid') ticketUuid: string,
    @Query('size') size: string | undefined = '10',
    @Query('page') page: string | undefined = '0',
  ): Promise<PaginatedResponse<CommentInterface>> {
    try {
      const ticket: TicketInterface = await this.findOneTicketByUuid(ticketUuid);
      const query = new ListAllCommentsQuery(
        parseInt(size, 10),
        parseInt(page, 10),
        [],
        new Map([['ticket', ticket]])
      );
      const results: [CommentInterface[] , number] = await this._queryBus.execute(query);
      const collection: CommentInterface[] = await Promise.all(
        results[0].map(async (comment: CommentInterface) => await this._commentTransformer.transform(comment))
      );
      return this.paginateResponse(
        parseInt(size, 10),
        parseInt(page, 10),
        collection,
        results[1]
      );
    } catch (e) {
      const message: string = `CommentController - listAll error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async findOne(@Param() params): Promise<CommentInterface> {
    try {
      return this.findOneCommentByUuid(params.uuid);
    } catch (e) {
      const message: string = `CommentController - get ${params.uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async post(
    @Param('ticketUuid') ticketUuid: string,
    @Body() createACommentDto: CreateACommentDto,
    @CurrentUser() user: UserInterface,
  ): Promise<CommentInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateACommentCommand(uuid, createACommentDto.content, user.uuid, ticketUuid);
      await this._commandBus.execute(command);
      return await this.findOneCommentByUuid(uuid);
    } catch (e) {
      const message: string = `CommentController - Add comment error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async put(
    @Body() updateACommentDto: UpdateACommentDto,
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<CommentInterface> {
    try {
      const command = new UpdateACommentCommand(
        uuid,
        updateACommentDto.status,
        user.uuid,
        updateACommentDto.content
      );
      await this._commandBus.execute(command);
      return await this.findOneCommentByUuid(uuid);
    } catch (e) {
      const message: string = `CommentController - Update ${uuid} comment error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async delete(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<CommentInterface> {
    try {
      const command = new DeleteACommentCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
      return await this.findOneCommentByUuid(uuid);
    } catch (e) {
      const message: string = `CommentController - Delete comment ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
  }

  private async findOneCommentByUuid(uuid: string, nullable: boolean = false): Promise<CommentInterface | null> {
    let comment: CommentInterface | null = null;
    try {
      const query = new GetOneCommentQuery(uuid);
      comment = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `CommentController - findOneComment ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!comment && !nullable) {
      const message: string = `CommentController - Comment ${uuid} not found`;
      this.http404Response(message);
    }

    return plainToClass(CommentEntity, comment);
  }

  private async findOneTicketByUuid(uuid: string, nullable: boolean = false): Promise<TicketInterface | null> {
    let ticket: TicketInterface | null = null;
    try {
      const query = new GetOneTicketQuery(uuid);
      ticket = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `CommentController - findOneTicketByUuid ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!ticket && !nullable) {
      const message: string = `CommentController - Ticket ${uuid} not found`;
      this.http404Response(message);
    }

    return ticket;
  }
}
