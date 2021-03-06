import { classToClass } from 'class-transformer';
import { LoggerInterface } from '../../../domain/utils/logger.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  protected paginateResponse(size: number, page: number, results: [any[] , number]): PaginatedResponse {
    const total: number = results && results.length > 1 && typeof results[1] === 'number' ? results[1] : 0;
    const collection: any[] = results && results.length > 1 ? results[0].map((item: any) => classToClass(item)) : [];
    const pages: number = Math.ceil(total / size) || 1;
    page === 0 ? page++ : page;

    return { page, pages, total, collection};
  }

  protected http404Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }

  protected http500Response(message: string): HttpException {
    this._logger.error(message);
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
