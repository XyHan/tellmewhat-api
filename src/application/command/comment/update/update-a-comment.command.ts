import { CommandInterface } from '../../command.interface';

export class UpdateACommentCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _status: number;
  private readonly _updatedBy: string;
  private readonly _content: string;

  constructor(
    uuid: string,
    status: number,
    updatedBy: string,
    content: string,
  ) {
    this._uuid = uuid;
    this._status = status;
    this._updatedBy = updatedBy;
    this._content = content;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get uuid(): string {
    return this._uuid;
  }

  get status(): number {
    return this._status;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }

  get content(): string {
    return this._content;
  }
}
