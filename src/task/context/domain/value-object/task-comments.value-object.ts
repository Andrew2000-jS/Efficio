import { ValueObject } from '@shared/context';

export class TaskComments extends ValueObject<string> {
  constructor(value: string | null) {
    super(value);
    this.ensureTaskCommentsIsValid(value);
  }

  private ensureTaskCommentsIsValid(value: string | null): void {
    if (value && (value.length < 1 || value.length > 255)) {
      throw new Error('Task comments must be between 1 and 255 characters');
    }
  }
}
