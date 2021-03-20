import { Inject, Injectable } from '@nestjs/common';
import { BcryptAdapter } from '../../adapter/bcrypt.adapter';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { AuthServiceException } from './auth.service.exception';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { JsonWebTokenAdapter } from '../../adapter/jwt/json-web-token.adapter';
import { TokenInterface, TokenModel } from '../../../../domain/model/auth/token.model';
import { UserInterface } from '../../../../domain/model/user/user.model';

@Injectable()
export class AuthService implements AuthManagerInterface {
  private readonly _encrypter: EncrypterInterface;
  private readonly _jwtAdapter: JsonWebTokenAdapter;

  constructor(
    @Inject(BcryptAdapter) encrypter: EncrypterInterface,
    @Inject(JsonWebTokenAdapter) jwtAdapter: JsonWebTokenAdapter,
  ) {
    this._encrypter = encrypter;
    this._jwtAdapter = jwtAdapter;
  }

  public async isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean> {
    try {
      return await this._encrypter.compare(passwordToCompare, passwordToCompareWith);
    } catch (e) {
      throw new AuthServiceException(`AuthService - validate - Password validation error: ${e.message}\n`);
    }
  }

  public generateToken(user: UserInterface): TokenInterface {
    try {
      const token: string = this._jwtAdapter.sign(user);
      return new TokenModel(token);
    } catch (e) {
      throw new AuthServiceException(`AuthService - generateToken - Token generation for user ${user.email} error: ${e.message}\n`);
    }
  }
}
