import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AuthNotFoundException,
  AuthNotValidException,
  AuthUnauthorized,
} from '@auth/context/domain';

const errorTypes = [
  AuthNotFoundException,
  AuthUnauthorized,
  AuthNotValidException,
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
        if (errorHanlder) throw new BadRequestException(error.message);

        if (error instanceof AuthNotFoundException)
          throw new NotFoundException('Auth not found');

        throw new InternalServerErrorException(error.message);
      }
    };
  };
}
