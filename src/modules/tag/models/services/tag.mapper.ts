import { TagEntity } from '../../../../database/entities/tag.entity';
import { TagResponseDto } from '../dto/response/tag.response.dto';

export class TagMapper {
  public static toResponseDto(entity: TagEntity): TagResponseDto {
    return {
      name: entity.name,
      articlesCount: entity.articlesCount,
    };
  }
  public static toListResponseDto(entities: TagEntity[]): TagResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
