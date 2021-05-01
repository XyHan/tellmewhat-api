import { CommandInterface } from '../../../command.interface';

export class UpdateATicketCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _status: number;
  private readonly _updatedBy: string;
  private readonly _subject: string;
  private readonly _description: string | null;
  private readonly _type: string;
  private readonly _project: string;

  constructor(
    uuid: string,
    status: number,
    updatedBy: string,
    subject: string,
    description: string | null,
    type: string,
    project: string
  ) {
    this._uuid = uuid;
    this._status = status;
    this._updatedBy = updatedBy;
    this._subject = subject;
    this._description = description;
    this._type = type;
    this._project = project;
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

  get subject(): string {
    return this._subject;
  }

  get description(): string | null {
    return this._description;
  }

  get type(): string {
    return this._type;
  }

  get project(): string {
    return this._project;
  }
}
