import { Exception, ValueObject } from '@shared/context';

export class UserName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserNameIsValid(value);
  }

  private ensureUserNameIsValid(value: string): void {
    const hasNumbers = /.*\d.*/;
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (value.length > 30) {
      throw new Exception(
        `The name: ${value} has more than 30 characters`,
        'UserNameLengthException',
      );
    }

    if (value.length < 3) {
      throw new Exception(
        `The name: ${value} has less then 3 characters`,
        'UserNameLengthException',
      );
    }

    if (specialChars.test(value) || hasNumbers.test(value)) {
      throw new Exception(
        `The name: ${value} can't contain invalid characters`,
        'UserNameLengthException',
      );
    }
  }
}
