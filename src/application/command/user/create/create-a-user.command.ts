import { CommandInterface } from '../../command.interface';

export class CreateAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(
    uuid: string,
    email: string,
    password: string,
  ) {
    this._uuid = uuid;
    this._email = email;
    this._password = password;
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

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
