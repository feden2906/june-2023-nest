import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { Config, PostgresConfig } from '../../configs/config.type';

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get<PostgresConfig>('postgres');
    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.user,
      password: postgresConfig.password,
      database: postgresConfig.dbName,
      entities: [
        path.join(
          process.cwd(),
          'dist',
          'src',
          'database',
          'entities',
          '*.entity.js',
        ),
      ],
      migrations: [
        path.join(
          process.cwd(),
          'dist',
          'src',
          'database',
          'migrations',
          '*.js',
        ),
      ],
      migrationsRun: true,
      synchronize: false,
    };
  }
}
