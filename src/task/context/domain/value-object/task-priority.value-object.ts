import { EnumValueObject } from '@shared/context/domain';
import { Priority } from '../task.entity';

export class TaskPriority extends EnumValueObject<Priority> {
  protected throwErrorForInvalidValue(value: Priority): void {
    throw new Error(
      `Invalid task priority: ${value}. Allowed values are: ${Object.values(Priority).join(', ')}.`,
    );
  }
}
