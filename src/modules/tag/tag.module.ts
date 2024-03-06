import { Module } from '@nestjs/common';

import { TagService } from './models/services/tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class TagModule {}
