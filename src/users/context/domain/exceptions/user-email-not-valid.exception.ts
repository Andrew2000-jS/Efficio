export class UserEmailNotValidException extends Error {
  constructor() {
    super('User email is invalid!');
    this.name = UserEmailNotValidException.name;
  }
}
