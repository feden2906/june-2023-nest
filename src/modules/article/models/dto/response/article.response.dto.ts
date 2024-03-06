import { UserResponseDto } from '../../../../user/models/dto/response/user.response.dto';

export class ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  isLiked: boolean;
  tags: string[];
  user?: UserResponseDto;
}
