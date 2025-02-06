import { EnumValueObject } from '@shared/context/domain';
import { Status } from '../task.entity';

export class TaskStatus extends EnumValueObject<Status> {
  protected throwErrorForInvalidValue(value: Status): void {
    throw new Error(
      `Invalid task status: ${value}. Allowed values are: ${Object.values(Status).join(', ')}.`,
    );
  }
}
