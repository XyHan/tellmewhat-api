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
import { RolesValueObject } from '../../../infrastructure/security/value-object/roles.value-object';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthManagerInterface,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const headers = this.validHeaders(context);
      const token: TokenInterface = new TokenModel(headers.headers.authorization);
      const user: UserInterface | boolean = await this.authService.isValidUser(token);
      if (user && typeof user !== 'boolean' && this.areValidRoles(user, context)) {
        Reflect.defineMetadata('currentUser', user, BaseController);
        return true;
      }
      return false;
    } catch (e) {
      throw new UnauthorizedException('[AuthGuard] Bad credentials');
    }
  }

  private validHeaders(context: ExecutionContext): IncomingMessage {
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

  private areValidRoles(user: UserInterface,context: ExecutionContext): boolean {
    const entrypointAvailableRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    return user
      && user.roles
      && user.roles.some((role: string) =>
        RolesValueObject.isValidRole(role) && entrypointAvailableRoles.some((entrypointAvailableRole: string) => entrypointAvailableRole === role)
      );
  }
}
