import { IsString, IsStrongPassword } from 'class-validator';

export class DigestLoginDto {
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
