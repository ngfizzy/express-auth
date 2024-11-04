import express from 'express';

import { health as hSrvMod } from '../../services';
import { health } from '../../controllers';

const healthController = new health.HealthController(new hSrvMod.HealthService());

export const router = express.Router();

router.get('/', (req, res) => healthController.checkHealth(req, res));
