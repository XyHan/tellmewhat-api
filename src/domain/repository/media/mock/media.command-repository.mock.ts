import { MediaCommandRepositoryInterface } from '../media.command-repository.interface';
import { MediaInterface } from '../../../model/ticket/media.model';
import { MediaRepositoryException } from '../media.repository.exception';
import { MediaFixtures } from '../../../fixtures/media.fixtures';

export class MediaCommandRepositoryMock implements MediaCommandRepositoryInterface {
  public async create(media: MediaInterface): Promise<MediaInterface> {
    this.isValidMedia(media);
    try {
      MediaFixtures.saveMedia(media);
      return Promise.resolve(media);
    } catch (e) {
      const message: string = `MediaCommandRepository - Error on create media '${media.uuid}'`;
      throw new MediaRepositoryException(message);
    }
  }

  public async delete(media: MediaInterface): Promise<MediaInterface> {
    try {
      MediaFixtures.deleteMedia(media);
      return Promise.resolve(media);
    } catch (e) {
      const message: string = `MediaCommandRepository - Error on delete media '${media.uuid}'`;
      throw new MediaRepositoryException(message);
    }
  }

  private isValidMedia(media: MediaInterface): boolean {
    if (
      !media.originalFilename
      || !media.originalFilename.length
      || !media.filename
      || !media.filename.length
      || !media.uuid
      || !media.uuid.length
    ) {
      const message: string = `MediaCommandRepository - Error on create media '${media.uuid}' - originalFilename, filename and uuid cannot be empty`;
      throw new MediaRepositoryException(message);
    }
    return true;
  }
}
