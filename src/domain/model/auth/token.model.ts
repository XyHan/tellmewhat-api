export interface TokenInterface {
  readonly token: string;
}

export class TokenModel implements TokenInterface {
  protected readonly _token: string;

  constructor(token?: string) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }
}
