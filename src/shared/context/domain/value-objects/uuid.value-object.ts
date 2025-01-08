import { v4 as uuid } from 'uuid';
import { ValueObject } from './value-object';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static generate(): Uuid {
    return new Uuid(uuid());
  }
}
