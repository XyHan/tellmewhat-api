import {
  Controller,
  Delete,
  Get, HttpCode,
  Inject,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Res,
  Req
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MediaInterface } from '../../../../../../domain/model/ticket/media.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneMediaQuery } from '../../../../../../application/query/ticket/media/get-one-media/get-one-media.query';
import { ListAllMediaQuery } from '../../../../../../application/query/ticket/media/list-all-media/list-all-media.query';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { CreateAMediaCommand } from '../../../../../../application/command/ticket/media/create/create-a-media.command';
import { v4 } from 'uuid';
import { plainToClass} from 'class-transformer';
import { BaseController, PaginatedResponse } from '../../../base.controller';
import { DeleteAMediaCommand } from '../../../../../../application/command/ticket/media/delete/delete-a-media.command';
import { MediaEntity } from '../../../../../../infrastructure/ticket/entity/media.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { ConfigService } from '../../../../../../infrastructure/config/config.service';

@Controller('/tickets/:ticketUuid/media')
export class MediaController extends BaseController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  protected readonly _logger: LoggerInterface;
  private readonly _config: ConfigService;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
    @Inject(ConfigService) config: ConfigService,
  ) {
    super(logger);
    this._queryBus = queryBus;
    this._commandBus = commandBus;
    this._config = config;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async listAll(
    @Query('size') size: string | undefined = '10',
    @Query('page') page: string | undefined = '0',
  ): Promise<PaginatedResponse> {
    try {
      const query = new ListAllMediaQuery(parseInt(size, 10), parseInt(page, 10));
      const results: [MediaInterface[] , number] = await this._queryBus.execute(query);
      const collection: MediaInterface[] = results[0].map((media: MediaInterface) => plainToClass(MediaEntity, media))
      return this.paginateResponse(
        parseInt(size, 10),
        parseInt(page, 10),
        collection,
        results[1]
      );
    } catch (e) {
      const message: string = `MediaController - listAll error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async findOne(
    @Param('ticketUuid') ticketUuid: string,
    @Param('uuid') uuid: string,
    @Req() req: Request,
  ): Promise<MediaInterface> {
    const media: MediaInterface = await this.findOneMediaByUuid(uuid);
    try {
      return Object.assign(
        media,
        { source: `${req.protocol}://${req.headers.host || req.hostname}/tickets/${ticketUuid}/media/${media.uuid}/download` }
      );
    } catch (e) {
      const message: string = `MediaController - get ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('/:uuid/download')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  public async download(
    @Param('uuid') uuid: string,
    @Res() response: Response
  ): Promise<void> {
    try {
      const media: MediaInterface = await this.findOneMediaByUuid(uuid);
      response.set({ 'Content-Type': media.mimeType });
      response.set({ 'Content-Disposition': `attachment; filename=${media.originalFilename}` })
      createReadStream(`${this._config.storageDir}/${media.filename}`).pipe(response);
    } catch (e) {
      const message: string = `MediaController - download media ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('file'))
  public async post(
    @Param('ticketUuid') ticketUuid: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserInterface,
  ): Promise<MediaInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateAMediaCommand(uuid, file.originalname, file.filename, file.mimetype, user.uuid, ticketUuid);
      await this._commandBus.execute(command);
      return await this.findOneMediaByUuid(uuid);
    } catch (e) {
      const message: string = `MediaController - Add media error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @HttpCode(204)
  public async delete(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<{}> {
    try {
      const command = new DeleteAMediaCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
      return {};
    } catch (e) {
      const message: string = `MediaController - Delete media ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
  }

  private async findOneMediaByUuid(uuid: string, nullable: boolean = false): Promise<MediaInterface | null> {
    let media: MediaInterface | null = null;
    try {
      const query = new GetOneMediaQuery(uuid);
      media = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `MediaController - findOneMedia ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!media && !nullable) {
      const message: string = `MediaController - Media ${uuid} not found`;
      this.http404Response(message);
    }

    return plainToClass(MediaEntity, media);
  }
}
