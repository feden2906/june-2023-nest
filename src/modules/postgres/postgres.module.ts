import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresService } from './postgres.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresService,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService<Config>) => {
    //     const postgresConfig = configService.get<PostgresConfig>('postgres');
    //     return {
    //       type: 'postgres',
    //       host: postgresConfig.host,
    //       port: postgresConfig.port,
    //       username: postgresConfig.user,
    //       password: postgresConfig.password,
    //       database: postgresConfig.dbName,
    //       entities: [path.join(process.cwd(), 'dist', 'database', 'entities', '*.entity.js')],
    //       synchronize: false,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class PostgresModule {}
