import { UserEntity } from '../../../database/entities/user.entity';
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';

export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    tokens: TokenResponseDto,
  ): AuthUserResponseDto {
    return {
      user: userEntity,
      tokens,
    };
  }
}
