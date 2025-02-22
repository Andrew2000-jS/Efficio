import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  UserAlreadyExistException,
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserNotFoundException,
  UserPasswordNotValidException,
} from '@users/context/domain';

const errorTypes = [
  UserNameNotValidException,
  UserLastNameNotValidException,
  UserEmailNotValidException,
  UserPasswordNotValidException,
  UserNotFoundException,
  UserAlreadyExistException,
];

export function UserErrorHanlder() {
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

        if (error instanceof UserNotFoundException)
          throw new NotFoundException('User not found');

        if (errorHanlder) throw new BadRequestException(error.message);

        throw new InternalServerErrorException(error.message);
      }
    };
  };
}
