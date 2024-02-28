import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_PROVIDER')
    private readonly redisClient: Redis,
  ) {}

  /**
   * Add member to hash set.
   */
  public async addOneToSet(hash: string, value: string): Promise<number> {
    return await this.redisClient.sadd(hash, value);
  }

  /**
   * Remove one member from hash set.
   */
  public async remOneFromSet(key: string, setMember: string): Promise<number> {
    return await this.redisClient.srem(key, setMember);
  }

  /**
   * Delete all records by key from Redis.
   */
  public async deleteByKey(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  /**
   * Get all the members in a set.
   */
  public async sMembers(key: string): Promise<string[]> {
    return await this.redisClient.smembers(key);
  }

  /**
   * Sets a timeout on a key.
   * After the timeout, the key will be automatically deleted (in seconds).
   */
  public async expire(key: string, time: number): Promise<number> {
    return await this.redisClient.expire(key, time);
  }
}
