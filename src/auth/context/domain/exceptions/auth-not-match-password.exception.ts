export class AuthUnauthorized extends Error {
  constructor() {
    super('Unauthorized auth');
    this.message = AuthUnauthorized.name;
  }
}
