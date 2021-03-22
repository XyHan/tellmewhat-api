import { MediaInterface } from '../../../../domain/model/ticket/media.model';
import { MediaCommandRepositoryInterface } from '../../../../domain/repository/media/media.command-repository.interface';
import { CreateAMediaCommand } from './create-a-media.command';
import { CreateAMediaCommandHandler } from './create-a-media.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { MediaCommandRepositoryMock } from '../../../../domain/repository/media/mock/media.command-repository.mock';
import { MediaQueryRepositoryMock } from '../../../../domain/repository/media/mock/media.query-repository.mock';
import { MediaQueryRepositoryInterface } from '../../../../domain/repository/media/media.query-repository.interface';
import { CreateAMediaCommandHandlerException } from './create-a-media.command.handler.exception';
import { TicketQueryRepositoryInterface } from '../../../../domain/repository/ticket/ticket.query-repository.interface';
import { TicketQueryRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { TicketCommandRepositoryInterface } from '../../../../domain/repository/ticket/ticket.command-repository.interface';
import { TicketCommandRepositoryMock } from '../../../../domain/repository/ticket/mock/ticket.command-repository.mock';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const ORIGINAL_FILENAME = 'test.png';
const MIME_TYPE = 'image/png';
const FILENAME = 'f654bsdf5b41f651b3';
const CREATED_BY = '08ee082c-be8c-4a50-8533-83c7e774cbff';
const TICKET_UUID = '0d66db91-4441-4563-967c-797d767c7288';

describe('create a media handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: MediaCommandRepositoryInterface;
  let queryRepository: MediaQueryRepositoryInterface;
  let ticketQueryRepository: TicketQueryRepositoryInterface;
  let ticketCommandRepository: TicketCommandRepositoryInterface;

  beforeEach(() => {
    commandRepository = new MediaCommandRepositoryMock();
    queryRepository = new MediaQueryRepositoryMock();
    ticketQueryRepository = new TicketQueryRepositoryMock();
    ticketCommandRepository = new TicketCommandRepositoryMock();
  })

  it ('create a media success', async () => {
    const command = new CreateAMediaCommand(UUID, ORIGINAL_FILENAME, FILENAME, MIME_TYPE, CREATED_BY, TICKET_UUID);
    const handler = new CreateAMediaCommandHandler(commandRepository, ticketQueryRepository, ticketCommandRepository, logger);
    await handler.handle(command);
    const media: MediaInterface | null = await queryRepository.findOne(UUID);
    expect(media.uuid).toBe(UUID);
    expect(media.createdAt).toBeDefined();
    expect(media.createdBy).toBe(CREATED_BY);
    expect(media.originalFilename).toEqual(ORIGINAL_FILENAME);
    expect(media.filename).toEqual(FILENAME);
    expect(media.mimeType).toEqual(MIME_TYPE);
  });

  it('create a media error', async () => {
    const command = new CreateAMediaCommand('', '', '', '', '', '');
    const handler = new CreateAMediaCommandHandler(commandRepository, ticketQueryRepository, ticketCommandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(CreateAMediaCommandHandlerException);
  });
});
