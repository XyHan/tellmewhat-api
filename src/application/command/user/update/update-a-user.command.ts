import { CommandInterface } from '../../command.interface';

export class UpdateAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _status: string;
  private readonly _email: string;

  constructor(
    uuid: string,
    status: string,
    email: string,
  ) {
    this._uuid = uuid;
    this._status = status;
    this._email = email;
  }

  get uuid(): string {
    return this._uuid;
  }

  get status(): string {
    return this._status;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get email(): string {
    return this._email;
  }
}
