import { TicketInterface, TicketModel } from './ticket.model';

export interface CommentInterface {
  uuid: string;
  status: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  content: string;
  ticket: TicketInterface;
}

export class CommentModel implements CommentInterface {
  protected _createdAt: Date;
  protected _createdBy: string;
  protected _status: number;
  protected _content: string;
  protected _updatedAt: Date;
  protected _updatedBy: string;
  protected _uuid: string;
  protected _ticket: TicketModel;

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

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
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

  get ticket(): TicketModel {
    return this._ticket;
  }

  set ticket(value: TicketModel) {
    this._ticket = value;
  }
}
