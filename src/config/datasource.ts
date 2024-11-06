import { DataSource } from 'typeorm';
import { environment } from './environment';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environment.db.host,
  port: environment.db.port,
  username: environment.db.username,
  password: environment.db.password,
  database: environment.db.database,
  logging: environment.nodeEnv === 'development' || environment.nodeEnv === 'test',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
