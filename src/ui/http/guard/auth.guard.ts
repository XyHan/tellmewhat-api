import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthManagerInterface } from '../../../domain/utils/security/auth-manager.interface';
import { TokenInterface, TokenModel } from '../../../domain/model/auth/token.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthManagerInterface,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
      const headers = this.validHeaders(context);
      const token: TokenInterface = new TokenModel(headers.headers.authorization);
      return await this.authService.register(token);
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
