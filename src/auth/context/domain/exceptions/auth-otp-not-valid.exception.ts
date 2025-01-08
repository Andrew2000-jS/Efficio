export class AutOtpNotValidException extends Error {
  constructor() {
    super('OTP is not valid');
    this.name = AutOtpNotValidException.name;
  }
}
