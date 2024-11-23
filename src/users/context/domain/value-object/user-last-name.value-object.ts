import { Exception, ValueObject } from '@shared/context';

export class UserLastName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserLastNameIsValid(value);
  }

  private ensureUserLastNameIsValid(value: string): void {
    const hasNumbers = /.*\d.*/;
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (value.length > 30) {
      throw new Exception(
        `The last name: ${value} has more than 30 characters`,
        'UserLastNameException',
      );
    }

    if (value.length < 3) {
      throw new Exception(
        `The last name: ${value} has less then 3 characters`,
        'UserLastNameException',
      );
    }

    if (specialChars.test(value) || hasNumbers.test(value)) {
      throw new Exception(
        `The last name: ${value} can't contain invalid characters`,
        'UserLastNameException',
      );
    }
  }
}
