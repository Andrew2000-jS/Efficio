import { ValueObject } from '@shared/context';

export class TaskTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureTaskTitleIsValide(value);
  }

  private ensureTaskTitleIsValide(value: string): void {
    const blacklist =
      /['"\\;\-\-|\/\*\*\/\%\_\&\|\^\~\`\/\:\*\?\#\<\>\0\n\r\t]/;

    if (value.length < 1 || value.length > 100) {
      throw new Error('Task title must be between 1 and 255 characters');
    }

    if (blacklist.test(value)) {
      throw new Error('Task title contains forbidden characters.');
    }
  }
}
