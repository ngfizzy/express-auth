import { AppDataSource } from '../config';

export class HealthService {
  async checkDatabaseConnection(): Promise<boolean> {
    // console.log('io just did this>>>>>>>>>>>>>>>>>>>')
    try {
      await AppDataSource.query(`SELECT 1`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
