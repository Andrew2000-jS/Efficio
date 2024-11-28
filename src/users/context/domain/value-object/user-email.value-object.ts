import { ValueObject } from '@shared/context';
import { UserEmailNotValidException } from '../exceptions';

export class UserEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserEmailIsValid(value);
  }

  private ensureUserEmailIsValid(value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) throw new UserEmailNotValidException();
  }
}
