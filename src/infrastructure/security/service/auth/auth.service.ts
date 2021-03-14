import { Inject, Injectable } from '@nestjs/common';
import { BcryptAdapter } from '../../adapter/bcrypt.adapter';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { IQueryBus, QueryBus } from '@nestjs/cqrs';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { AuthServiceException } from './auth.service.exception';
import { GetOneUserByEmailQuery } from '../../../../application/query/user/get-one-user-by-email/get-one-user-by-email.query';

@Injectable()
export class AuthService {
  private readonly _encrypter: EncrypterInterface;
  private readonly _queryBus: IQueryBus;

  constructor(
    @Inject(BcryptAdapter) encrypter: EncrypterInterface,
    @Inject(QueryBus) queryBus: IQueryBus,
  ) {
    this._encrypter = encrypter;
    this._queryBus = queryBus;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user: UserInterface | null = await this.findOneUserByEmail(email);
    if (user && user.password) {
      return this._encrypter.compare(password, user.password);
    }
    return null;
  }

  private async findOneUserByEmail(email: string): Promise<UserInterface | null> {
    try {
      const query = new GetOneUserByEmailQuery(email);
      return await this._queryBus.execute(query);
    } catch (e) {
      throw new AuthServiceException(`AuthService - findOneUserByEmail - Error for user email ${email}: ${e.message}`);
    }
  }
}
