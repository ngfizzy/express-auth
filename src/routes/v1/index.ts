import express from 'express';

import { router as healthRouter } from './health.routes';

export const v1Router = express.Router();

v1Router.use('/health', healthRouter);
