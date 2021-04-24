import { CommandInterface } from '../../../command.interface';

export class CreateATicketCommand implements CommandInterface {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _version: number;
  private readonly _subject: string;
  private readonly _createdBy: string;
  private readonly _type: string;
  private readonly _project: string;

  constructor(
    uuid: string,
    subject: string,
    createdBy: string,
    type: string,
    project: string
  ) {
    this._uuid = uuid;
    this._subject = subject;
    this._createdBy = createdBy;
    this._type = type;
    this._project = project;
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

  get subject(): string {
    return this._subject;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get type(): string {
    return this._type;
  }

  get project(): string {
    return this._project;
  }
}
