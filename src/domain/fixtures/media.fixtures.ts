import { MediaInterface, MediaModel } from '../model/ticket/media.model';
import { TICKET_COLLECTION } from './ticket.fixtures';
import { MediaFactory } from '../factory/media.factory';

export const MEDIA_COLLECTION: MediaInterface[] = [
  new MediaFactory(new MediaModel()).generate(
    'e1844d91-0c55-433e-a907-db2f29de3303',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'file1.png',
    'v654sf54v6s454s3',
    'image/png',
    TICKET_COLLECTION[0]
  ),
  new MediaFactory(new MediaModel()).generate(
    '204df646-3b8a-450b-b15c-fab854149136',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'file2.pdf',
    'f849b8f4b98f4b6f',
    'application/pdf',
    TICKET_COLLECTION[0]
  )
];

export class MediaFixtures {
  private static readonly _mediaCollection: MediaInterface[] = MEDIA_COLLECTION;

  public static get mediaCollection(): MediaInterface[] {
    return this._mediaCollection;
  }

  public static deleteMedia(mediaToDelete: MediaInterface): void {
    const index: number = this._mediaCollection.findIndex((media: MediaInterface) => media.uuid === mediaToDelete.uuid);
    if (index) this._mediaCollection.splice(index, 1);
  }

  public static saveMedia(mediaToSave: MediaInterface): void {
    this._mediaCollection.push(mediaToSave);
  }
}
