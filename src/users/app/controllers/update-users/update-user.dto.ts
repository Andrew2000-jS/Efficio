import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserPrimitivesWithoutMetadata } from 'src/users/context/domain';

export class UpdateUserDto implements Partial<UserPrimitivesWithoutMetadata> {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsDate()
  @IsOptional()
  birthday: Date;
}
