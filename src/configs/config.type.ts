export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
};
