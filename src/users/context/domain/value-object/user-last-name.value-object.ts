import { ValueObject } from '@shared/context';
import { UserLastNameNotValidException } from '../exceptions';

export class UserLastName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserLastNameIsValid(value);
  }

  private ensureUserLastNameIsValid(value: string): void {
    const hasNumbers = /.*\d.*/;
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (value.length > 30) throw new UserLastNameNotValidException();

    if (value.length < 3) throw new UserLastNameNotValidException();

    if (specialChars.test(value) || hasNumbers.test(value))
      throw new UserLastNameNotValidException();
  }
}
