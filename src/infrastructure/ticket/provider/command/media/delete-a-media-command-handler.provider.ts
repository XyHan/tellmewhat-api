import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { MediaCommandRepository } from '../../../repository/media/media.command-repository';
import { MediaCommandRepositoryInterface } from '../../../../../domain/repository/media/media.command-repository.interface';
import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';
import { DeleteAMediaCommandHandler } from '../../../../../application/command/media/delete/delete-a-media.command.handler';
import { MediaQueryRepository } from '../../../repository/media/media.query-repository';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';

export const deleteAMediaCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_MEDIA_COMMAND_HANDLER',
  useFactory: (
    mediaCommandRepository: MediaCommandRepositoryInterface,
    mediaQueryRepository: MediaQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new DeleteAMediaCommandHandler(mediaCommandRepository, mediaQueryRepository, ticketCommandRepository, logger);
  },
  inject: [MediaCommandRepository, MediaQueryRepository, TicketCommandRepository, LoggerAdapterService],
}
