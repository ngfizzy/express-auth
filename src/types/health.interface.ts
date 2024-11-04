export type AppHealthStatus = 'healthy' | 'unhealthy' | 'error';
export type DBConnStatus = 'connected' | 'disconnected';

export interface CheckHealthRes {
  status: AppHealthStatus;
  database?: DBConnStatus;
  message: string;
  timestamp: string;
}
