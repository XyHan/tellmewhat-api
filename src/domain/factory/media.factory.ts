import { MediaInterface } from '../model/ticket/media.model';
import { TicketInterface } from '../model/ticket/ticket.model';

export interface MediaFactoryInterface {
  generate(
    uuid: string,
    createdAt: Date,
    createdBy: string,
    originalFilename: string,
    filename: string,
    mimeType: string,
    ticket: TicketInterface
  ): MediaInterface;
}

export class MediaFactory implements MediaFactoryInterface {
  private readonly _instance: MediaInterface;

  constructor(instance: MediaInterface) {
    this._instance = instance;
  }

  public generate(
    uuid: string,
    createdAt: Date,
    createdBy: string,
    originalFilename: string,
    filename: string,
    mimeType: string,
    ticket: TicketInterface
  ): MediaInterface {
    this._instance.uuid = uuid;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.originalFilename = originalFilename;
    this._instance.filename = filename;
    this._instance.mimeType = mimeType;
    this._instance.ticket = ticket;

    return this._instance;
  }
}
