import { ValueObject } from '@shared/context';

export class TaskDescription extends ValueObject<string> {
  constructor(value: string | null) {
    super(value);
  }

  private ensureTaskDescriptionIsValid(value: string | null): void {
    if (value && (value.length < 1 || value.length > 255)) {
      throw new Error('Task description must be between 1 and 255 characters');
    }
  }
}
