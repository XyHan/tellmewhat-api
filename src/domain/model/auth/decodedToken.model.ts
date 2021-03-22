export interface DecodedTokenInterface {
  uuid: string;
  email: string;
  iat: string;
  exp: string;
}

export class DecodedTokenModel implements DecodedTokenInterface {
  protected _uuid: string;
  protected _email: string;
  protected _iat: string;
  protected _exp: string;

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get iat(): string {
    return this._iat;
  }

  set iat(value: string) {
    this._iat = value;
  }

  get exp(): string {
    return this._exp;
  }

  set exp(value: string) {
    this._exp = value;
  }
}
