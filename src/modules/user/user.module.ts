import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
