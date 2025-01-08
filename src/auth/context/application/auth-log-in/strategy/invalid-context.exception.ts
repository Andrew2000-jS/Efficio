export class InvalidContextException extends Error {
  constructor() {
    super('Context must be defined before running.');
    this.message = InvalidContextException.name;
  }
}
