import { CommandInterface } from '../../command.interface';

export class UpdateATicketCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _status: number;
  private readonly _updatedBy: string;
  private readonly _subject: string;
  private readonly _description: string;

  constructor(
    uuid: string,
    status: number,
    updatedBy: string,
    subject: string,
    description: string,
  ) {
    this._uuid = uuid;
    this._status = status;
    this._updatedBy = updatedBy;
    this._subject = subject;
    this._description = description;
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

  get description(): string {
    return this._description;
  }
}
