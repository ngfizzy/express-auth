import { DataSource } from 'typeorm';
import { environment } from './environment';
import logger from '../utils/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environment.db.host,
  port: environment.db.port,
  username: environment.db.username,
  password: environment.db.password,
  database: environment.db.database,
  logging: environment.nodeEnv === 'development',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Data Source has been initialized!');
  } catch (error) {
    logger.error('Error during Data Source initialization:', error);
    throw error;
  }
};
