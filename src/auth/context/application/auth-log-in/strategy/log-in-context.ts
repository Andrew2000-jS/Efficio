import { AuthPrimitives } from 'src/auth/context/domain/auth.entity';
import { LogInStrategy } from './interfaces';
import { InvalidContextException } from './invalid-context.exception';

export class LogInContext {
  constructor(private context?: LogInStrategy) {}

  public setStrategy(context: LogInStrategy) {
    this.context = context;
  }

  public execute(auth: AuthPrimitives) {
    if (!this.context) {
      throw new InvalidContextException();
    }
    return this.context.execute(auth);
  }
}
