import { ValueObject } from '@shared/context';
import { UserNameNotValidException } from '../exceptions';

export class UserName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserNameIsValid(value);
  }

  private ensureUserNameIsValid(value: string): void {
    const hasNumbers = /.*\d.*/;
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (value.length > 30) throw new UserNameNotValidException();

    if (value.length < 3) throw new UserNameNotValidException();

    if (specialChars.test(value) || hasNumbers.test(value))
      throw new UserNameNotValidException();
  }
}
