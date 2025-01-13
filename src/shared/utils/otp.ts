export function generateOTP(length: number = 6) {
  let digits = '0123456789abcdefghijklmnopqrstuvwxyz';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)];
  }
  return OTP;
}
