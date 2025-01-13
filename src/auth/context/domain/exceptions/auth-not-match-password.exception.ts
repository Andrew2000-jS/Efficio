export class AuthUnauthorized extends Error {
  constructor() {
    super('Incorrect email or password!');
    this.message = AuthUnauthorized.name;
  }
}
