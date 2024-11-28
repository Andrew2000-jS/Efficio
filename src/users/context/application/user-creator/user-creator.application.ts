import { Injectable } from '@shared/utils';
import { ApiResponse, Criteria } from '@shared/context';
import {
  User,
  UserAlreadyExistException,
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserPasswordNotValidException,
  UserPrimitives,
  UserPrimitivesWithoutMetadata,
  UserRepository,
} from '../../domain';
import { errorHanlder } from '@shared/context/exceptions';

@Injectable()
export class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async run(
    data: UserPrimitivesWithoutMetadata,
  ): Promise<ApiResponse<UserPrimitives | null>> {
    try {
      const criteria = new Criteria({ email: data.email });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length >= 1) throw new UserAlreadyExistException();

      const user = User.create(data).toPrimitives();
      await this.repository.create(user);
      return {
        message: 'User created successfully',
        statusCode: 201,
        data: user,
      };
    } catch (error) {
      errorHanlder(error, [
        UserAlreadyExistException,
        UserNameNotValidException,
        UserLastNameNotValidException,
        UserPasswordNotValidException,
        UserEmailNotValidException,
      ]);
    }
  }
}
