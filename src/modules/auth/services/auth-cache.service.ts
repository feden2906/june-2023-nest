import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config, JWTConfig } from '../../../configs/config.type';
import { RedisService } from '../../redis/redis.service';
import { AUTH_CACHE } from '../constants/constants';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async saveToken(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<void> {
    const key = `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, accessToken);
    await this.redisService.expire(key, this.jwtConfig.accessTokenExpiration);
  }

  public async removeToken(userId: string, deviceId: string): Promise<void> {
    await this.redisService.deleteByKey(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<boolean> {
    const userAccessTokens = await this.redisService.sMembers(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
    return userAccessTokens.some((token: string) => token === accessToken);
  }
}
