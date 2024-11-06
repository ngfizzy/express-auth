import express from 'express';

import { router as healthRouter } from './health.routes';
import { router as authRouter } from './auth.routes';
import { router as usersRouter } from './users.routes';
import * as middleware from '../../middleware';

export const v1Router = express.Router();

v1Router.use('/health', healthRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/users', middleware.auth.authenticateToken, usersRouter);
