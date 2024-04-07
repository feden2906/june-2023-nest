import { PickType } from '@nestjs/swagger';

import { BaseAuthRequestDto } from './base-auth.request.dto';

export class SignUpRequestDto extends PickType(BaseAuthRequestDto, [
  'deviceId',
  'name',
  'email',
  'password',
]) {}
