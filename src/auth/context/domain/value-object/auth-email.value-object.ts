import { ValueObject } from '@shared/context';
import { AuthNotValidException } from '../exceptions';

export class AuthEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureAuthEmailIsValid(value);
  }

  private ensureAuthEmailIsValid(value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) throw new AuthNotValidException();
  }
}
