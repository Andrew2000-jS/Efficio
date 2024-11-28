import { Injectable } from '@shared/utils';
import {
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserNotFoundException,
  UserPasswordNotValidException,
  UserPrimitives,
  UserRepository,
} from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';
import { errorHanlder } from '@shared/context/exceptions';

@Injectable()
export class UserUpdater {
  constructor(private readonly repository: UserRepository) {}

  async run(
    id: string,
    user: Partial<UserPrimitives>,
  ): Promise<ApiResponse<Partial<UserPrimitives> | null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

      await this.repository.update(id, user);
      return {
        message: 'User updated successfully',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      errorHanlder(error, [
        UserNotFoundException,
        UserNameNotValidException,
        UserLastNameNotValidException,
        UserPasswordNotValidException,
        UserEmailNotValidException,
      ]);
    }
  }
}
