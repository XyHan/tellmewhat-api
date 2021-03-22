import { MediaQueryRepositoryInterface } from '../media.query-repository.interface';
import { MediaInterface } from '../../../model/ticket/media.model';
import { MediaRepositoryException } from '../media.repository.exception';
import { findAllOptions } from '../../find-all-options.type';
import { MediaFixtures } from '../../../fixtures/media.fixtures';

export class MediaQueryRepositoryMock implements MediaQueryRepositoryInterface {
  public async findAll(options: findAllOptions): Promise<[MediaInterface[], number]> {
    try {
      return Promise.resolve([MediaFixtures.mediaCollection, MediaFixtures.mediaCollection.length]);
    } catch (e) {
      const message: string = `MediaQueryRepository - Error on findAll medias`;
      throw new MediaRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<MediaInterface | null> {
    try {
      const media: MediaInterface | undefined = MediaFixtures.mediaCollection.find((media: MediaInterface) => media.uuid === uuid);
      return media ? Promise.resolve(media) : Promise.resolve(null);
    } catch (e) {
      const message: string = `MediaQueryRepository - Error on findOne media '${uuid}'`;
      throw new MediaRepositoryException(message);
    }
  }
}
