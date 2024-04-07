import { PickType } from '@nestjs/swagger';

import { BaseArticleRequestDto } from './base-article.request.dto';

export class CreateArticleRequestDto extends PickType(BaseArticleRequestDto, [
  'title',
  'body',
  'description',
  'tags',
]) {}
