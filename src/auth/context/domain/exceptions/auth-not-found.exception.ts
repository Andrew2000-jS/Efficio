export class AuthNotFoundException extends Error {
  constructor() {
    super('User not found!');
    this.message = AuthNotFoundException.name;
  }
}
