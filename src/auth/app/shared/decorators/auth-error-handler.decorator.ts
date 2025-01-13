import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthNotFoundException,
  AuthUnauthorized,
  AutOtpNotValidException,
} from '@auth/context/domain';

const errorTypes = [
  AuthNotFoundException,
  AuthUnauthorized,
  AutOtpNotValidException,
];

export function AuthErrorHanlder() {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const orginalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await orginalMethod.apply(this, args);
      } catch (error) {
        const errorHanlder = errorTypes.some(
          (errorType) => error instanceof errorType,
        );

        if (error instanceof AuthNotFoundException)
          throw new NotFoundException('Auth not found');

        if (error instanceof AuthUnauthorized)
          throw new UnauthorizedException('Incorrect email or password!');

        if (errorHanlder) throw new BadRequestException(error.message);

        throw new InternalServerErrorException(error.message);
      }
    };
  };
}
