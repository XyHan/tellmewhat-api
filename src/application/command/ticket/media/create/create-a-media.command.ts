import { CommandInterface } from '../../../command.interface';

export class CreateAMediaCommand implements CommandInterface {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _version: number;
  private readonly _originalFilename: string;
  private readonly _filename: string;
  private readonly _mimeType: string;
  private readonly _createdBy: string;
  private readonly _ticketUuid: string;

  constructor(
    uuid: string,
    originalFilename: string,
    filename: string,
    mimeType: string,
    createdBy: string,
    ticketUuid: string,
  ) {
    this._uuid = uuid;
    this._originalFilename = originalFilename;
    this._filename = filename;
    this._mimeType = mimeType;
    this._createdBy = createdBy;
    this._ticketUuid = ticketUuid;
    this._name = 'create-a-media-command';
    this._version = 1;
  }

  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get originalFilename(): string {
    return this._originalFilename;
  }

  get filename(): string {
    return this._filename;
  }

  get mimeType(): string {
    return this._mimeType;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get ticketUuid(): string {
    return this._ticketUuid;
  }

  get version(): number {
    return this._version;
  }
}
