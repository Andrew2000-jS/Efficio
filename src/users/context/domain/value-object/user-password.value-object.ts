import { UserPasswordNotValidException } from '../exceptions';
import { compare, hash } from '@shared/utils';

export class UserPassword {
  private value: string;

  constructor(value: string) {
    this.ensurePasswordIsValid(value);
    this.value = this.hashPassword(value);
  }

  private ensurePasswordIsValid(value: string): void {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@$#\-_%^&*()+=[\]{};':"\\|,.<>/?~`]/;

    if (value.length < 8) throw new UserPasswordNotValidException();

    if (
      !uppercaseRegex.test(value) ||
      !lowercaseRegex.test(value) ||
      !digitRegex.test(value) ||
      !specialCharRegex.test(value)
    )
      throw new UserPasswordNotValidException();
  }

  hashPassword(password: string): string {
    return hash(password);
  }

  getValue(): string {
    return this.value;
  }

  static comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): boolean {
    return compare(plainPassword, hashedPassword);
  }
}
