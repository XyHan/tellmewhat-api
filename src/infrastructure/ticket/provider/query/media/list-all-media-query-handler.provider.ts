import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { MediaQueryRepository } from '../../../repository/media/media.query-repository';
import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';
import { ListAllMediaQueryHandler } from '../../../../../application/query/media/list-all-media/list-all-media.query.handler';

export const listAllMediaQueryHandlerProvider: FactoryProvider = {
  provide: 'LIST_ALL_MEDIA_QUERY_HANDLER',
  useFactory: (mediaRepository: MediaQueryRepositoryInterface, logger: LoggerInterface) => {
    return new ListAllMediaQueryHandler(mediaRepository, logger);
  },
  inject: [MediaQueryRepository, LoggerAdapterService],
}
