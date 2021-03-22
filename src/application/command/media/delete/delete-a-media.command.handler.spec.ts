import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { MediaCommandRepositoryInterface } from '../../../../domain/repository/media/media.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { MediaQueryRepositoryInterface } from '../../../../domain/repository/media/media.query-repository.interface';
import { DeleteAMediaCommand } from './delete-a-media.command';
import { DeleteAMediaCommandHandler } from './delete-a-media.command.handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { MediaCommandRepositoryMock } from '../../../../domain/repository/media/mock/media.command-repository.mock';
import { MediaQueryRepositoryMock } from '../../../../domain/repository/media/mock/media.query-repository.mock';
import { DeleteAMediaCommandHandlerException } from './delete-a-media.command.handler.exception';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.command-repository.mock';

const UUID = '204df646-3b8a-450b-b15c-fab854149136';
const UPDATED_BY = 'fa9f9d7d-3303-4b08-ad27-61bd605c9d19';

describe('delete a media handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: MediaCommandRepositoryInterface;
  let queryRepository: MediaQueryRepositoryInterface;
  let ticketCommandRepository: TicketCommandRepositoryInterface;

  beforeEach(() => {
    commandRepository = new MediaCommandRepositoryMock();
    queryRepository = new MediaQueryRepositoryMock();
    ticketCommandRepository = new TicketCommandRepositoryMock();
  })

  it ('delete a media success', async () => {
    const command = new DeleteAMediaCommand(UUID, UPDATED_BY);
    const handler = new DeleteAMediaCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await handler.handle(command);
    const media: MediaInterface | null = await queryRepository.findOne(UUID);
    expect(media).toBeNull();
  });

  it('delete a media error', async () => {
    const command = new DeleteAMediaCommand('', '');
    const handler = new DeleteAMediaCommandHandler(commandRepository, queryRepository, ticketCommandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(DeleteAMediaCommandHandlerException);
  });
});
