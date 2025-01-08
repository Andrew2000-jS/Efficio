import { LogInStrategy } from './log-in-strategy';

export interface IDigestStrategy extends LogInStrategy {
  password: string;
}
