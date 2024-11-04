import express from 'express';

import logger from './utils/logger';
import { environment, initializeDatabase } from './config';
import { v1Router } from './routes';

const app = express();

app.use(express.json());
app.use('/v1', v1Router);

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
