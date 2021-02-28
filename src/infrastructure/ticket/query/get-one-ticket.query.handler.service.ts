import { GetOneTicketHandler } from '../../../application/query/ticket/get-one-ticket/get-one-ticket.query.handler';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs/dist";
import { GetOneTicketQuery } from '../../../application/query/ticket/get-one-ticket/get-one-ticket.query';
import { TicketInterface } from '../../../domain/model/ticket.model';
import { Inject } from '@nestjs/common';
import { TicketQueryRepository } from '../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../domain/repository/ticket/ticket.query-repository.interface';

@QueryHandler(GetOneTicketQuery)
export class GetOneTicketQueryHandlerService extends GetOneTicketHandler implements IQueryHandler {
  constructor(
    @Inject(TicketQueryRepository) repository: TicketQueryRepositoryInterface
  ) {
    super(repository);
  }

  async execute(query: GetOneTicketQuery): Promise<TicketInterface> {
    return await this.handle(query);
  }
}
