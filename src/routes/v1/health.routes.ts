import express from 'express';

import { HealthService } from '../../services';
import { health } from '../../controllers';

const healthController = new health.HealthController(new HealthService());

export const router = express.Router();

router.get('/', (req, res) => healthController.checkHealth(req, res));
