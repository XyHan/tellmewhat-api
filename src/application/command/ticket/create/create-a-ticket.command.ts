import { CommandInterface } from '../../command.interface';

export class CreateATicketCommand implements CommandInterface {
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _version: number;
  private readonly _subject: string;
  private readonly _description: string;

  constructor(
    uuid: string,
    subject: string,
    description: string,
  ) {
    this._uuid = uuid;
    this._subject = subject;
    this._description = description;
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

  get description(): string {
    return this._description;
  }
}
