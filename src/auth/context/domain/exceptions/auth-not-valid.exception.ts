export class AuthNotValidException extends Error {
  constructor() {
    super('Incorrect email or password!');
    this.name = AuthNotValidException.name;
  }
}
