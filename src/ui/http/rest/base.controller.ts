import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TicketInterface } from '../../../domain/model/ticket/ticket.model';
import { UserInterface } from '../../../domain/model/user/user.model';
import { CommentInterface } from '../../../domain/model/ticket/comment.model';
import { MediaInterface } from '../../../domain/model/ticket/media.model';

export type result = TicketInterface | UserInterface | CommentInterface | MediaInterface;

export interface PaginatedResponse {
  page: number;
  pages: number;
  total: number;
  collection: any[];
}

export abstract class BaseController {
  protected readonly _logger: LoggerInterface;

  protected constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  protected paginateResponse(size: number, page: number, collection: result[], total: number): PaginatedResponse {
    const pages: number = Math.ceil(total / size) || 1;
    page === 0 ? page++ : page;

    return { page, pages, total, collection};
  }

  protected http404Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }

  protected http400Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  protected http401Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }
}
