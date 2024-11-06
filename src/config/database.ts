import { logging } from '../utils';

import { AppDataSource } from './datasource';

const logger = logging.logger;
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Data Source has been initialized!');
  } catch (error) {
    logger.error('Error during Data Source initialization:', error);
    throw error;
  }
};
