import { ValueObject } from '@shared/context';

export class UserBirthday extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }
}
