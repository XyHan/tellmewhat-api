import { CommandInterface } from '../../../command.interface';

export class CreateACommentCommand implements CommandInterface {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _version: number;
  private readonly _content: string;
  private readonly _createdBy: string;
  private readonly _ticketUuid: string;

  constructor(
    uuid: string,
    content: string,
    createdBy: string,
    ticketUuid: string,
  ) {
    this._uuid = uuid;
    this._content = content;
    this._createdBy = createdBy;
    this._ticketUuid = ticketUuid;
  }

  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get content(): string {
    return this._content;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get ticketUuid(): string {
    return this._ticketUuid;
  }
}
