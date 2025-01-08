export class UserNameNotValidException extends Error {
  constructor() {
    super('User name is invalid!');
    this.name = UserNameNotValidException.name;
  }
}
