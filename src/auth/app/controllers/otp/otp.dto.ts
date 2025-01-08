import { IsEmail, IsString } from 'class-validator';

export class OtpDto {
  @IsString()
  otp: string;

  @IsEmail()
  email: string;
}
