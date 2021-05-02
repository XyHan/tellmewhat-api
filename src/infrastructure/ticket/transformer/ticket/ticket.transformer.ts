import { TicketInterface } from '../../../../domain/model/ticket/ticket.model';
import { Injectable, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs/dist';
import { IQueryBus } from '@nestjs/cqrs';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByUuidQuery } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { TicketTransformerException } from './ticket.transformer.exception';
import { plainToClass } from 'class-transformer';
import { TicketEntity } from '../../entity/ticket.entity';

@Injectable()
export class TicketTransformer {
  private readonly _queryBus: IQueryBus;
  private readonly _logger: LoggerInterface;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._queryBus = queryBus;
    this._logger = logger;
  }

  async transform(ticket: TicketInterface): Promise<TicketInterface> {
    if (ticket.createdBy) {
      ticket.createdBy = await this.getUserEmail(ticket.createdBy);
    }
    if (ticket.updatedBy) {
      ticket.updatedBy = await this.getUserEmail(ticket.updatedBy);
    }
    return plainToClass(TicketEntity, ticket);
  }

  private async getUserEmail(uuid: string): Promise<string> {
    try {
      const query: GetOneUserByUuidQuery | null = new GetOneUserByUuidQuery(uuid, ['email']);
      const user: UserInterface = await this._queryBus.execute(query);
      return user && user.email ? user.email : '';
    } catch (e) {
      const message: string = `TicketTransformer - getUserEmail ${uuid} error. Previous: ${e.message}`;
      this._logger.error(message);
      throw new TicketTransformerException(message);
    }
  }
}
