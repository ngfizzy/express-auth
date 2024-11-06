import 'reflect-metadata';

import express from 'express';

import { logging } from './utils';
import { environment, initializeDatabase } from './config';
import { v1Router } from './routes';

const logger = logging.logger;
export const app = express();

app.use(express.json());
app.use('/api/v1', v1Router);

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(environment.port, () => {
      logger.info(`Server running on ${environment.host}:${environment.port}`);
    });
  } catch (error) {
    logger.error('Error connecting to the database', error);
  }
};

startServer();
