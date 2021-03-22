import { findAllOptions } from '../find-all-options.type';
import { MediaInterface } from '../../model/ticket/media.model';

export interface MediaQueryRepositoryInterface {
  findOne(uuid: string): Promise<MediaInterface | null>;
  findAll(options: findAllOptions): Promise<[MediaInterface[], number]>;
}
