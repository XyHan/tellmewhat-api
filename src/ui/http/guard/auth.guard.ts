import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthManagerInterface } from '../../../domain/utils/security/auth-manager.interface';
import { TokenInterface, TokenModel } from '../../../domain/model/auth/token.model';
import { UserInterface } from '../../../domain/model/user/user.model';
import { BaseController } from '../rest/base.controller';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthManagerInterface) {}

  async canActivate(context: ExecutionContext) {
    try {
      const headers = this.validHeaders(context);
      const token: TokenInterface = new TokenModel(headers.headers.authorization);
      const user: UserInterface | boolean = await this.authService.isValidUser(token);
      if (user) {
        Reflect.defineMetadata('currentUser', user, BaseController);
        return true;
      }
      return false;
    } catch (e) {
      throw new UnauthorizedException('[AuthGuard] Bad credentials');
    }
  }

  validHeaders(context: ExecutionContext): any {
    const headers = _.find(context.getArgs(), 'headers');

    if (
      typeof headers === 'undefined' ||
      typeof headers.headers === 'undefined' ||
      typeof headers.headers.authorization === 'undefined'
    ) {
      throw new UnauthorizedException('[AuthGuard] A valid token is required');
    }

    return headers;
  }
}
