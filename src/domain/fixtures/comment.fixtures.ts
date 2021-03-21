import { CommentInterface, CommentModel } from '../model/ticket/comment.model';
import { CommentFactory } from '../factory/comment.factory';

export const COMMENT_COLLECTION: CommentInterface[] = [
  new CommentFactory(new CommentModel()).generate(
    'e1844d91-0c55-433e-a907-db2f29de3303',
    1,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nunc leo.',
  ),
  new CommentFactory(new CommentModel()).generate(
    '204df646-3b8a-450b-b15c-fab854149136',
    1,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    'Vestibulum sit amet fringilla nunc. Fusce porta congue purus lobortis blandit.',
  )
];

export class CommentFixtures {
  private static readonly _commentCollection: CommentInterface[] = COMMENT_COLLECTION;

  public static get commentCollection(): CommentInterface[] {
    return this._commentCollection;
  }

  public static deleteComment(commentToDelete: CommentInterface): void {
    const index: number = this._commentCollection.findIndex((comment: CommentInterface) => comment.uuid === commentToDelete.uuid);
    if (index) {
      this._commentCollection.splice(index, 1);
    }
  }

  public static updateComment(commentToUpdate: CommentInterface): void {
    const userIndex: number = this._commentCollection.findIndex((comment: CommentInterface) => comment.uuid === commentToUpdate.uuid);
    if (userIndex) {
      this._commentCollection.splice(userIndex, 1);
      this._commentCollection.push(
        new CommentFactory(new CommentModel()).generate(
          commentToUpdate.uuid,
          commentToUpdate.status,
          commentToUpdate.createdAt,
          commentToUpdate.createdBy,
          commentToUpdate.updatedAt,
          commentToUpdate.updatedBy,
          commentToUpdate.content,
        )
      );
    }
  }

  public static addComment(comment: CommentInterface): void {
    this._commentCollection.push(new CommentFactory(new CommentModel()).generate(
      comment.uuid,
      comment.status,
      comment.createdAt,
      comment.createdBy,
      comment.updatedAt,
      comment.updatedBy,
      comment.content,
    ));
  }
}
