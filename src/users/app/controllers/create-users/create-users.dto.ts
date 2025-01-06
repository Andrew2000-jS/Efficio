import { IsDate, IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { UserPrimitivesWithoutMetadata } from '@users/context/domain';

export class CreateUserDto implements UserPrimitivesWithoutMetadata {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  birthday: Date;
}
