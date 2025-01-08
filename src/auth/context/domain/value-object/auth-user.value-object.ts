export class AuthUser {
  value: Record<string, any>;

  constructor(value: Record<string, any>) {
    this.value = value;
  }

  getValue(): Record<string, any> {
    return this.value;
  }
}
