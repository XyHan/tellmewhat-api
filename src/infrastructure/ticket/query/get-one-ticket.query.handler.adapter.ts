import { GetOneTicketHandler } from '../../../application/query/ticket/get-one-ticket/get-one-ticket.query.handler';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { GetOneTicketQuery } from '../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { TicketInterface } from '../../../domain/model/ticket.model';
import { Inject } from '@nestjs/common';
import { TicketQueryRepository } from '../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger.interface';

@QueryHandler(GetOneTicketQuery)
export class GetOneTicketQueryHandlerAdapter extends GetOneTicketHandler implements IQueryHandler {
  constructor(
    @Inject(TicketQueryRepository) repository: TicketQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(repository, logger);
  }

  async execute(query: GetOneTicketQuery): Promise<TicketInterface | null> {
    return await this.handle(query);
  }
}
