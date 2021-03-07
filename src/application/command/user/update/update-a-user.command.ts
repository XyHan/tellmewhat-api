import { CommandInterface } from '../../command.interface';

export class UpdateAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _status: number;
  private readonly _email: string;
  private readonly _updatedBy: string;

  constructor(
    uuid: string,
    status: number,
    email: string,
    updatedBy: string,
  ) {
    this._uuid = uuid;
    this._status = status;
    this._email = email;
    this._updatedBy = updatedBy;
  }

  get uuid(): string {
    return this._uuid;
  }

  get status(): number {
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

  get updatedBy(): string {
    return this._updatedBy;
  }
}
