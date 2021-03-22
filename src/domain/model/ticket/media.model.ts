import { TicketInterface, TicketModel } from './ticket.model';

export interface MediaInterface {
  uuid: string;
  createdAt: Date;
  createdBy: string;
  originalFilename: string;
  filename: string;
  mimeType: string;
  ticket: TicketInterface;
}

export class MediaModel implements MediaInterface {
  protected _createdAt: Date;
  protected _createdBy: string;
  protected _uuid: string;
  protected _filename: string;
  protected _originalFilename: string;
  protected _mimeType: string;
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

  get filename(): string {
    return this._filename;
  }

  set filename(value: string) {
    this._filename = value;
  }

  get originalFilename(): string {
    return this._originalFilename;
  }

  set originalFilename(value: string) {
    this._originalFilename = value;
  }

  get mimeType(): string {
    return this._mimeType;
  }

  set mimeType(value: string) {
    this._mimeType = value;
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
