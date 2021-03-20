import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { GetOneUserByUuidQuery } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { GetOneUserByUuidQueryHandler } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query.handler';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';

@QueryHandler(GetOneUserByUuidQuery)
export class GetOneUserByUuidQueryHandlerAdapter extends GetOneUserByUuidQueryHandler implements IQueryHandler {
  constructor(
    @Inject(UserQueryRepository) repository: UserQueryRepositoryInterface,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    super(repository, logger);
  }

  async execute(query: GetOneUserByUuidQuery): Promise<UserInterface | null> {
    return await this.handle(query);
  }
}
