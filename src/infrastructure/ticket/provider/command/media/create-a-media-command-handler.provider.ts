import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CreateAMediaCommandHandler } from '../../../../../application/command/ticket/media/create/create-a-media.command.handler';
import { MediaCommandRepository } from '../../../repository/media/media.command-repository';
import { MediaCommandRepositoryInterface } from '../../../../../domain/repository/media/media.command-repository.interface';
import { TicketQueryRepository } from '../../../repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketCommandRepositoryInterface } from '../../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepository } from '../../../repository/ticket/ticket.command-repository';

export const createAMediaCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_MEDIA_COMMAND_HANDLER',
  useFactory: (
    mediaRepository: MediaCommandRepositoryInterface,
    ticketQueryRepository: TicketQueryRepositoryInterface,
    ticketCommandRepository: TicketCommandRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new CreateAMediaCommandHandler(mediaRepository, ticketQueryRepository, ticketCommandRepository, logger);
  },
  inject: [MediaCommandRepository, TicketQueryRepository, TicketCommandRepository, LoggerAdapterService],
}
