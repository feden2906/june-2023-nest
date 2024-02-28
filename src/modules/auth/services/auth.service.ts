import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInRequestDto } from '../dto/request/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly refreshRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: SignUpRequestDto): Promise<AuthUserResponseDto> {
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordsMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: dto.deviceId,
      }),
      this.authCacheService.removeToken(user.id, dto.deviceId),
    ]);

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async logout(userData: IUserData): Promise<void> {
    await Promise.all([
      this.refreshRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(userData.userId, userData.deviceId),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(user.id, userData.deviceId),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: userData.deviceId,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        userData.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        userData.deviceId,
        tokens.accessToken,
      ),
    ]);
    return tokens;
  }
}
