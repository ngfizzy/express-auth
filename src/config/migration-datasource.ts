import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { environment } from './environment';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const MigrationDatasource = new DataSource({
  type: 'postgres',
  host: environment.db.externalHost,
  port: Number.parseInt(environment.db.externalPort, 10),
  username: environment.db.username,
  password: environment.db.password,
  database: environment.db.database,
  logging: environment.nodeEnv === 'development',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});