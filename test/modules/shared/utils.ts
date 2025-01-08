import { UserPrimitivesWithoutMetadata } from '@users/context/domain';

export const mockUser: UserPrimitivesWithoutMetadata = {
  email: 'jhon@mail.com',
  name: 'John',
  lastName: 'Doe',
  password: 'Awesom3P@ssword123',
  birthday: new Date('1990-01-01'),
};

export const userWithInvalidName = { ...mockUser, name: 'Jh0n' };
export const userWithInvalidLastName = { ...mockUser, lastName: 'Do@e' };
export const userWithInvalidEmail = { ...mockUser, email: 'incorrectEmail' };
export const userWithInvalidPassword = { ...mockUser, password: 'password' };
