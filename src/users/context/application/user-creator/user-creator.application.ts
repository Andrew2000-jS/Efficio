import { Injectable } from '@shared/utils';
import { ApiResponse, Criteria } from '@shared/context';
import { User, UserPrimitives, UserRepository } from '../../domain';

@Injectable()
export class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async run(data: UserPrimitives): Promise<ApiResponse<UserPrimitives | null>> {
    try {
      const criteria = new Criteria({ email: data.email });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length >= 1) {
        return {
          message: 'User already exist',
          statusCode: 400,
          data: null,
        };
      }

      const user = User.create(data).toPrimitives();
      await this.repository.create(user);
      return {
        message: 'User created successfully',
        statusCode: 201,
        data: user,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something was wrong',
        statusCode: 500,
        data: null,
      };
    }
  }
}
