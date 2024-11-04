import { Request, Response } from 'express';
import { health } from '../services/';
import logger from '../utils/logger';
import { http } from '../utils';
import { tHealth } from '../types';
import { HealthService } from '../services/health.service';

export class HealthController {
  private healthSrv: health.HealthService;
  constructor(healthSrv: HealthService) {
    this.healthSrv = healthSrv;
  }

  async checkHealth(_: Request, res: Response<tHealth.CheckHealthRes>) {
    const timestamp = new Date().toISOString();
    try {
      const isDatabaseConnected = await this.healthSrv.checkDatabaseConnection();

      if (isDatabaseConnected) {
        res.status(http.Status.Ok).json({
          status: 'healthy',
          database: 'connected',
          message: 'server is healthy',
          timestamp,
        });

        return;
      }

      res.status(http.Status.ServiceUnavailable).json({
        status: 'unhealthy',
        database: 'disconnected',
        message: 'server is unhealthy',
        timestamp,
      });
      return;
    } catch (error) {
      logger.error('Error in health check', error);

      res
        .status(http.Status.InternalServerError)
        .json({ status: 'error', message: 'Internal server error', timestamp });
      return;
    }
  }
}
