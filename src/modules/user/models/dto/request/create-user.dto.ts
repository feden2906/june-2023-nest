import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim())
  name?: string;

  @IsInt()
  @Min(16)
  @Max(100)
  age: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/sdfsd/)
  password: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
