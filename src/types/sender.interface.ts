import { Result } from './services.interface';

export interface Sender {
  send(message: string, to: string, from?: string): Promise<Result>;
}
