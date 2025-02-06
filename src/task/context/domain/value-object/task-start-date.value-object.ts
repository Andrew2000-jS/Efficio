import { ValueObject } from '@shared/context';

export class TaskStartDate extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }
}
