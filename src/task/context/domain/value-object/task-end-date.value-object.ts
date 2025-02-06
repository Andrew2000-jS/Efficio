import { ValueObject } from '@shared/context';

export class TaskEndDate extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }
}
