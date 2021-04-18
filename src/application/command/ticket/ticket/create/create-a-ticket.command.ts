import { CommandInterface } from '../../../command.interface';

export class CreateATicketCommand implements CommandInterface {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _version: number;
  private readonly _subject: string;
  private readonly _createdBy: string;

  constructor(
    uuid: string,
    subject: string,
    createdBy: string,
  ) {
    this._uuid = uuid;
    this._subject = subject;
    this._createdBy = createdBy;
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
}
