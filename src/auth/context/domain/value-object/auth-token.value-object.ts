import { ValueObject } from '@shared/context';

export class AuthToken extends ValueObject<string | null> {
  constructor(value: string | null) {
    super(value);
  }
}
