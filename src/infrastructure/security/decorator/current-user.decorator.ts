import { createParamDecorator } from '@nestjs/common';
import { BaseController } from '../../../ui/http/rest/base.controller';
import { UserInterface } from '../../../domain/model/user/user.model';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entity/user.entity';

export const CurrentUser = createParamDecorator(() => {
  const user: UserInterface | any = Reflect.getMetadata('currentUser', BaseController)
  return plainToClass(UserEntity, user, { strategy: 'excludeAll', excludeExtraneousValues: true });
});
