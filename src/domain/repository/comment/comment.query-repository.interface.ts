import { findAllOptions } from '../find-all-options.type';
import { CommentInterface } from '../../model/ticket/comment.model';

export interface CommentQueryRepositoryInterface {
  findOne(uuid: string): Promise<CommentInterface | null>;
  findAll(options: findAllOptions): Promise<[CommentInterface[], number]>;
}
