import { MediaQueryRepositoryInterface } from '../../../../../domain/repository/media/media.query-repository.interface';
import { MediaInterface, MediaModel } from '../../../../../domain/model/ticket/media.model';
import { ListAllMediaQuery } from './list-all-media.query';
import { ListAllMediaQueryHandler } from './list-all-media.query.handler';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../../domain/utils/logger/logger.mock';
import { findAllOptions } from '../../../../../domain/repository/find-all-options.type';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('list all media handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a media success', async () => {
    const repository: MediaQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[MediaInterface[], number]> {
        const media = new MediaModel();
        media.uuid = UUID;
        return Promise.resolve([[media], 1]);
      },
    };
    const query = new ListAllMediaQuery(10, 0);
    const handler = new ListAllMediaQueryHandler(repository, logger);
    const media: [MediaInterface[], number] = await handler.handle(query);
    expect(media[0].length).toEqual(1);
    expect(media[0][0].uuid).toEqual(UUID);
  });

  it('list all media error', async () => {
    const repository: MediaQueryRepositoryInterface = {
      findOne: jest.fn(),
      findAll(options: findAllOptions): Promise<[MediaInterface[], number]> {
        const error: Error = new Error('Repository error');
        return Promise.reject(error);
      },
    };
    const query = new ListAllMediaQuery(10, 0);
    const handler = new ListAllMediaQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('ListAllMediaQueryHandler - error: Repository error');
    }
  });
});
