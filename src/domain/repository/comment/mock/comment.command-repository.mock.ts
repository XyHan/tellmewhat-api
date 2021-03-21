import { CommentCommandRepositoryInterface } from '../comment.command-repository.interface';
import { CommentInterface } from '../../../model/ticket/comment.model';
import { CommentRepositoryException } from '../comment.repository.exception';
import { CommentFixtures } from '../../../fixtures/comment.fixtures';

export class CommentCommandRepositoryMock implements CommentCommandRepositoryInterface {
  public async create(comment: CommentInterface): Promise<CommentInterface> {
    this.isValidComment(comment);
    try {
      CommentFixtures.addComment(comment);
      return Promise.resolve(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on create comment '${comment.uuid}'`;
      throw new CommentRepositoryException(message);
    }
  }

  public async delete(comment: CommentInterface): Promise<CommentInterface> {
    try {
      CommentFixtures.deleteComment(comment);
      return Promise.resolve(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on delete comment '${comment.uuid}'`;
      throw new CommentRepositoryException(message);
    }
  }

  public async update(comment: CommentInterface): Promise<CommentInterface> {
    this.isValidComment(comment);
    try {
      CommentFixtures.updateComment(comment);
      return Promise.resolve(comment);
    } catch (e) {
      const message: string = `CommentCommandRepository - Error on update comment '${comment.uuid}'`;
      throw new CommentRepositoryException(message);
    }
  }

  private isValidComment(comment: CommentInterface): boolean {
    if (!comment.content.length || !comment.uuid.length) {
      const message: string = `CommentCommandRepository - Error on create comment '${comment.uuid}' - content and uuid cannot be empty`;
      throw new CommentRepositoryException(message);
    }
    return true;
  }
}
