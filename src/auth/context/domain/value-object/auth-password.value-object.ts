import { ValueObject } from '@shared/context';
import { AuthNotValidException } from '../exceptions';

export class AuthPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensurePasswordIsValid(value);
  }

  private ensurePasswordIsValid(value: string): void {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@$#\-_%^&*()+=[\]{};':"\\|,.<>/?~`]/;

    if (value.length < 8) throw new AuthNotValidException();

    if (
      !uppercaseRegex.test(value) ||
      !lowercaseRegex.test(value) ||
      !digitRegex.test(value) ||
      !specialCharRegex.test(value)
    )
      throw new AuthNotValidException();
  }
}
