import { CommandInterface } from '../../command.interface';

export class DeleteAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;

  constructor(uuid: string) {
    this._uuid = uuid;
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
}
