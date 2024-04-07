import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUserData } from '../interfaces/user-data.interface';

export const CurrentUser = createParamDecorator<IUserData>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUserData;
  },
);
