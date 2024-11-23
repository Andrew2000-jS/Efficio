import { Exception, ValueObject } from '@shared/context';

export class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  private ensurePasswordIsValid(value: string): void {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@$#\-_%^&*()+=[\]{};':"\\|,.<>/?~`]/;

    if (value.length < 8) {
      throw new Exception(
        'The password must be at least 8 characters.',
        'UserPasswordException',
      );
    }

    if (
      !uppercaseRegex.test(value) ||
      !lowercaseRegex.test(value) ||
      !digitRegex.test(value) ||
      !specialCharRegex.test(value)
    ) {
      throw new Exception(
        'The password must be at least one capital letter, one lowercase letter, one number and an special character (@, $, #, - o _).',
        'UserPasswordException',
      );
    }
  }
}
