import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { CommentInterface } from '../../../../../../domain/model/ticket/comment.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneCommentQuery } from '../../../../../../application/query/comment/get-one-comment/get-one-comment.query';
import { ListAllCommentsQuery } from '../../../../../../application/query/comment/list-all-comments/list-all-comments.query';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { CreateACommentDto } from '../../dto/comment/create-a-comment.dto';
import { CreateACommentCommand } from '../../../../../../application/command/comment/create/create-a-comment.command';
import { v4 } from 'uuid';
import { plainToClass} from 'class-transformer';
import { BaseController, PaginatedResponse } from '../../../base.controller';
import { UpdateACommentDto } from '../../dto/comment/update-a-comment.dto';
import { UpdateACommentCommand } from '../../../../../../application/command/comment/update/update-a-comment.command';
import { DeleteACommentCommand } from '../../../../../../application/command/comment/delete/delete-a-comment.command';
import { CommentEntity } from '../../../../../../infrastructure/ticket/entity/comment.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {fileExistsSync} from "tsconfig-paths/lib/filesystem";

@Controller('/media')
export class MediaController extends BaseController {
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

  // @Get('/')
  // @UseGuards(AuthGuard)
  // @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  // public async listAll(
  //   @Query('size') size: string | undefined = '10',
  //   @Query('page') page: string | undefined = '0',
  // ): Promise<PaginatedResponse> {
  //   try {
  //     const query = new ListAllCommentsQuery(parseInt(size, 10), parseInt(page, 10));
  //     const results: [CommentInterface[] , number] = await this._queryBus.execute(query);
  //     const collection: CommentInterface[] = results[0].map((comment: CommentInterface) => plainToClass(CommentEntity, comment))
  //     return this.paginateResponse(
  //       parseInt(size, 10),
  //       parseInt(page, 10),
  //       collection,
  //       results[1]
  //     );
  //   } catch (e) {
  //     const message: string = `CommentController - listAll error. Previous: ${e.message}`;
  //     this.http400Response(message);
  //   }
  // }
  //
  // @Get('/:uuid')
  // @UseGuards(AuthGuard)
  // @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  // public async findOne(@Param() params): Promise<CommentInterface> {
  //   try {
  //     return this.findOneCommentByUuid(params.uuid);
  //   } catch (e) {
  //     const message: string = `CommentController - get ${params.uuid} error. Previous: ${e.message}`;
  //     this.http400Response(message);
  //   }
  // }

  @Post('/')
  // @UseGuards(AuthGuard)
  // @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  public async post(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      myme: file.mimetype,
      path: file.path,
      destination: file.destination
    };
  }

  // @Delete('/:uuid')
  // @UseGuards(AuthGuard)
  // @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  // public async delete(
  //   @Param('uuid') uuid: string,
  //   @CurrentUser() user: UserInterface,
  // ): Promise<CommentInterface> {
  //   try {
  //     const command = new DeleteACommentCommand(uuid, user.uuid);
  //     await this._commandBus.execute(command);
  //     return await this.findOneCommentByUuid(uuid);
  //   } catch (e) {
  //     const message: string = `CommentController - Delete comment ${uuid} error: ${e.message}`;
  //     this.http400Response(message);
  //   }
  // }
}
