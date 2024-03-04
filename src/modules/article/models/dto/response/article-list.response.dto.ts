import { ArticleResponseDto } from './article.response.dto';

export class ArticleListResponseDto {
  data: ArticleResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
