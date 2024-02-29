import { PickType } from '@nestjs/swagger';

import { BaseAuthRequestDto } from './base-auth.request.dto';

export class SignInRequestDto extends PickType(BaseAuthRequestDto, [
  'deviceId',
  'email',
  'password',
]) {}
