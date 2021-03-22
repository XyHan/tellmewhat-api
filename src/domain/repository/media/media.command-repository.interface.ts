import { MediaInterface } from '../../model/ticket/media.model';

export interface MediaCommandRepositoryInterface {
  create(comment: MediaInterface): Promise<MediaInterface>;
  delete(comment: MediaInterface): Promise<MediaInterface>;
}
