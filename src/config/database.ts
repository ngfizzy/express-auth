import { DataSource } from 'typeorm';
import { environment } from './environment';
import logger from '../utils/logger';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppDataSource } from './datasource';

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Data Source has been initialized!');
  } catch (error) {
    logger.error('Error during Data Source initialization:', error);
    throw error;
  }
};
