import { CommentInterface } from '../../model/ticket/comment.model';

export interface CommentCommandRepositoryInterface {
  create(comment: CommentInterface): Promise<CommentInterface>;
  update(comment: CommentInterface): Promise<CommentInterface>;
  delete(comment: CommentInterface): Promise<CommentInterface>;
}
