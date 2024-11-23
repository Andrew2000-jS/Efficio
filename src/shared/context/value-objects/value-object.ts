export type Primitives = string | number | boolean | Date;

export class ValueObject<T extends Primitives> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  toString(): string {
    return this.value.toString();
  }

  getValue(): T {
    return this.value;
  }
}
