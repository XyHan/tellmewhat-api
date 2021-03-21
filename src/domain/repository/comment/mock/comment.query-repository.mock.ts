import { CommentQueryRepositoryInterface } from '../comment.query-repository.interface';
import { CommentInterface } from '../../../model/ticket/comment.model';
import { CommentRepositoryException } from '../comment.repository.exception';
import { findAllOptions } from '../../find-all-options.type';
import { CommentFixtures } from '../../../fixtures/comment.fixtures';

export class CommentQueryRepositoryMock implements CommentQueryRepositoryInterface {
  public async findAll(options: findAllOptions): Promise<[CommentInterface[], number]> {
    try {
      return Promise.resolve([CommentFixtures.commentCollection, CommentFixtures.commentCollection.length]);
    } catch (e) {
      const message: string = `CommentQueryRepository - Error on findAll comments`;
      throw new CommentRepositoryException(message);
    }
  }

  public async findOne(uuid: string): Promise<CommentInterface | null> {
    try {
      const comment: CommentInterface | undefined = CommentFixtures.commentCollection.find((comment: CommentInterface) => comment.uuid === uuid);
      return comment ? Promise.resolve(comment) : Promise.resolve(null);
    } catch (e) {
      const message: string = `CommentQueryRepository - Error on findOne comment '${uuid}'`;
      throw new CommentRepositoryException(message);
    }
  }
}
