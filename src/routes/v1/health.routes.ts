import express from 'express';

import { HealthService } from '../../services';
import { HealthController } from '../../controllers';

const healthController = new HealthController(new HealthService());

export const router = express.Router();

router.get('/', (req, res) => healthController.checkHealth(req, res));
