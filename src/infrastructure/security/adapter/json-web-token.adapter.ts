import * as JsonWebToken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { TokenInterface } from '../../../domain/model/auth/token.model';
import { UserInterface } from '../../../domain/model/user/user.model';

@Injectable()
export class JsonWebTokenAdapter {
  decode(token: TokenInterface): { [p: string]: any } | string | null {
    return JsonWebToken.decode(this.cleanToken(token));
  }

  verify(token: TokenInterface): void {
    JsonWebToken.verify(this.cleanToken(token), '');
  }

  sign(user: UserInterface): void {
    const payload: { uuid: string; email: string } = { uuid: user.uuid, email: user.email };
    JsonWebToken.sign(payload, '');
  }

  cleanToken(token: TokenInterface): string {
    return token.value.replace('Bearer', '').trim();
  }
}
