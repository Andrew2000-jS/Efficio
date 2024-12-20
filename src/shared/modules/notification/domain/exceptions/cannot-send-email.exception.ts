export class CannotSendEmailException extends Error {
  constructor() {
    super('Email cannot be send, please try again');
    this.message = CannotSendEmailException.name;
  }
}
