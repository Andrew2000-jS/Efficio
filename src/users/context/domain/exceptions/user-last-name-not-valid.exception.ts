export class UserLastNameNotValidException extends Error {
  constructor() {
    super('User last name is invalid!');
    this.name = UserLastNameNotValidException.name;
  }
}
