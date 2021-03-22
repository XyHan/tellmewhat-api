import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Inject,
  Param,
  Post,
  Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { MediaInterface } from '../../../../../../domain/model/ticket/media.model';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { GetOneMediaQuery } from '../../../../../../application/query/media/get-one-media/get-one-media.query';
import { ListAllMediaQuery } from '../../../../../../application/query/media/list-all-media/list-all-media.query';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { CreateAMediaCommand } from '../../../../../../application/command/media/create/create-a-media.command';
import { v4 } from 'uuid';
import { plainToClass} from 'class-transformer';
import { BaseController, PaginatedResponse } from '../../../base.controller';
import { DeleteAMediaCommand } from '../../../../../../application/command/media/delete/delete-a-media.command';
import { MediaEntity } from '../../../../../../infrastructure/ticket/entity/media.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { CreateAMediaDto } from '../../dto/media/create-a-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  public async findOne(@Param('uuid') uuid: string): Promise<MediaInterface> {
    try {
      return this.findOneMediaByUuid(uuid);
    } catch (e) {
      const message: string = `MediaController - get ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('file'))
  public async post(
    @Body() createAMediaDto: CreateAMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserInterface,
  ): Promise<MediaInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateAMediaCommand(uuid, file.originalname, file.filename, file.mimetype, user.uuid, createAMediaDto.ticketUuid);
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
