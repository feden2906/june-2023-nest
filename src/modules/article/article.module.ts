import { Module } from '@nestjs/common';

import { ArticleController } from './article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
