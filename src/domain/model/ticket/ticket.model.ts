import { CommentInterface, CommentModel } from './comment.model';

export interface TicketInterface {
  uuid: string;
  status: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  subject: string;
  description: string | null;
  comments: CommentInterface[];
  type: string;
  project: string;
}

export class TicketModel implements TicketInterface {
  protected _createdAt: Date;
  protected _createdBy: string;
  protected _description: string | null;
  protected _status: number;
  protected _subject: string;
  protected _updatedAt: Date;
  protected _updatedBy: string;
  protected _uuid: string;
  protected _comments: CommentModel[];
  protected _type: string;
  protected _project: string;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get description(): string | null {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }

  set updatedBy(value: string) {
    this._updatedBy = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get comments(): CommentModel[] {
    return this._comments;
  }

  set comments(value: CommentModel[]) {
    this._comments = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get project(): string {
    return this._project;
  }

  set project(value: string) {
    this._project = value;
  }
}
