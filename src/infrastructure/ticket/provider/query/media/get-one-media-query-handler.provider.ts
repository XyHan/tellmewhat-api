import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { GetOneMediaQueryHandler } from '../../../../../application/query/ticket/media/get-one-media/get-one-media.query.handler';
import { MediaQueryRepository } from '../../../repository/media/media.query-repository';
import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';

export const getOneMediaQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_MEDIA_QUERY_HANDLER',
  useFactory: (mediaRepository: MediaQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneMediaQueryHandler(mediaRepository, logger);
  },
  inject: [MediaQueryRepository, LoggerAdapterService],
}
