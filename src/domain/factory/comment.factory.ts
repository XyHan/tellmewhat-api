import { CommentInterface } from '../model/ticket/comment.model';

export interface CommentFactoryInterface {
  generate(
    uuid: string,
    status: number,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
    content: string,
  ): CommentInterface;
}

export class CommentFactory implements CommentFactoryInterface {
  private readonly _instance: CommentInterface;

  constructor(instance: CommentInterface) {
    this._instance = instance;
  }

  public generate(
    uuid: string,
    status: number,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
    content: string,
  ): CommentInterface {
    this._instance.uuid = uuid;
    this._instance.status = status;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.updatedAt = updatedAt;
    this._instance.updatedBy = updatedBy;
    this._instance.content = content;

    return this._instance;
  }
}
