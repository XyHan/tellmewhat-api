import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { UserQueryRepository } from '../repository/user.query-repository';
import { UserQueryRepositoryInterface } from '../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../domain/model/user/user.model';
import { GetOneUserByEmailQuery } from '../../../application/query/user/get-one-user-by-email/get-one-user-by-email.query';
import { GetOneUserByEmailQueryHandler } from '../../../application/query/user/get-one-user-by-email/get-one-user-by-email.query.handler';

@QueryHandler(GetOneUserByEmailQuery)
export class GetOneUserByEmailQueryHandlerAdapter extends GetOneUserByEmailQueryHandler implements IQueryHandler {
  constructor(
    @Inject(UserQueryRepository) repository: UserQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(repository, logger);
  }

  async execute(query: GetOneUserByEmailQuery): Promise<UserInterface | null> {
    return await this.handle(query);
  }
}
