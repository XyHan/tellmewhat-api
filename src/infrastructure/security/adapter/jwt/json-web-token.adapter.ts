import * as JsonWebToken from 'jsonwebtoken';
import { Algorithm } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { TokenInterface } from '../../../../domain/model/auth/token.model';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { JwtException } from './jwt.exception';

export interface JwtPayloadInterface {
  uuid: string;
  email: string
}

@Injectable()
export class JsonWebTokenAdapter {
  private readonly _secret: string = Buffer.from('changeMeAsSoonAsPossible', 'base64').toString();

  public decode(token: TokenInterface): { [p: string]: any } | string | null {
    try {
      return JsonWebToken.decode(this.cleanToken(token));
    } catch (e) {
      throw new JwtException(`JsonWebTokenAdapter - decode - Error. Previous: ${e.message}\n`);
    }
  }

  public verify(token: TokenInterface): string | object {
    try {
      return JsonWebToken.verify(this.cleanToken(token), this._secret, { algorithms: ['HS256'] });
    } catch (e) {
      throw new JwtException(`JsonWebTokenAdapter - verify - Error: ${e.message}\n`);
    }
  }

  public sign(user: UserInterface, expiresIn: string | number = '1d', algorithm: Algorithm = 'HS256'): string {
    try {
      const payload: JwtPayloadInterface = { uuid: user.uuid, email: user.email };
      return JsonWebToken.sign(payload, this._secret, { algorithm, expiresIn });
    } catch (e) {
      throw new JwtException(`JsonWebTokenAdapter - sign - User ${user.email} error: ${e.message}\n`);
    }
  }

  public cleanToken(token: TokenInterface): string {
    return token.token.replace('Bearer', '').trim();
  }
}
