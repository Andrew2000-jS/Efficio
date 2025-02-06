export class TaskAssignedTo {
  value: Record<string, any> | null;

  constructor(value: Record<string, any> | null) {
    this.value = value;
  }

  getValue(): Record<string, any> | null {
    return this.value;
  }
}
