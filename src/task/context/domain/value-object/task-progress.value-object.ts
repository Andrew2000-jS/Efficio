import { ValueObject } from '@shared/context';

export class TaskProgress extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureTaskProgressIsValid(value);
  }

  private ensureTaskProgressIsValid(value: number): void {
    if (value < 0 || value > 100) {
      throw new Error('Task progress must be between 0 and 100');
    }
  }
}
