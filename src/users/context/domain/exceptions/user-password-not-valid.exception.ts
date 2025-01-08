export class UserPasswordNotValidException extends Error {
  constructor() {
    super('User password is invalid!');
    this.name = UserPasswordNotValidException.name;
  }
}
