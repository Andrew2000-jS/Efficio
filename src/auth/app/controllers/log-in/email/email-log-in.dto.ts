import { IsEmail } from 'class-validator';

export class EmailLoginDto {
  @IsEmail()
  email: string;
}
