export interface TokenInterface {
  value: string;
}

export class TokenModel implements TokenInterface {
  private _value: string;

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
