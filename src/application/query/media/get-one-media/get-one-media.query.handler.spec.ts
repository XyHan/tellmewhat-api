import { GetOneMediaQuery } from './get-one-media.query';
import { GetOneMediaQueryHandler } from './get-one-media.query.handler';
import { MediaQueryRepositoryInterface } from '../../../../domain/repository/media/media.query-repository.interface';
import { MediaInterface, MediaModel } from '../../../../domain/model/ticket/media.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';

export const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';

describe('get one media handler test', () => {
  let logger: LoggerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
  })

  it ('return a media success', async () => {
    const repository: MediaQueryRepositoryInterface = {
      findOne(uuid: string): Promise<MediaInterface> {
        const media = new MediaModel();
        media.uuid = UUID;
        return Promise.resolve(media);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneMediaQuery(UUID);
    const handler = new GetOneMediaQueryHandler(repository, logger);
    const media: MediaInterface = await handler.handle(query);
    expect(media.uuid).toEqual(UUID);
  });

  it('return a media error', async () => {
    const repository: MediaQueryRepositoryInterface = {
      findOne(uuid: string): Promise<MediaInterface> {
        const error: Error = new Error('Not found');
        return Promise.reject(error);
      },
      findAll: jest.fn(),
    };
    const query = new GetOneMediaQuery(UUID);
    const handler = new GetOneMediaQueryHandler(repository, logger);
    try {
      await handler.handle(query);
    } catch (e) {
      expect(e.message).toEqual('GetOneMediaQueryHandler - Media 31dd20e0-9a1d-4734-b0af-d9cc3aff4028 error: Not found');
    }
  });
});
