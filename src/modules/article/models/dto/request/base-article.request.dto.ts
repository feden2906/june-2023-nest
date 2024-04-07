import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseArticleRequestDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  tags: string[];
}
