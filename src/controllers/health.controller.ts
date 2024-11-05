import { Request, Response } from 'express';
import logger from '../utils/logger';
import { tHealth, tNetwork } from '../types';
import { HealthService } from '../services/health.service';

export class HealthController {
  private healthSrv: HealthService;
  constructor(healthSrv: HealthService) {
    this.healthSrv = healthSrv;
  }

  async checkHealth(_: Request, res: Response<tHealth.CheckHealthRes>) {
    const timestamp = new Date().toISOString();
    try {
      const isDatabaseConnected = await this.healthSrv.checkDatabaseConnection();

      if (isDatabaseConnected) {
        res.status(tNetwork.Status.Ok).json({
          status: 'healthy',
          database: 'connected',
          message: 'server is healthy',
          timestamp,
        });

        return;
      }

      res.status(tNetwork.Status.ServiceUnavailable).json({
        status: 'unhealthy',
        database: 'disconnected',
        message: 'server is unhealthy',
        timestamp,
      });
      return;
    } catch (error) {
      logger.error('Error in health check', error);

      res
        .status(tNetwork.Status.InternalServerError)
        .json({ status: 'error', message: 'Internal server error', timestamp });
      return;
    }
  }
}
