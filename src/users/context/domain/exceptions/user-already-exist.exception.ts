export class UserAlreadyExistException extends Error {
  constructor() {
    super('User already exist!');
    this.name = UserAlreadyExistException.name;
  }
}
