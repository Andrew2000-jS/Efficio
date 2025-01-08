import { Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import { AuthNotFoundException } from '../../domain/exceptions';

@Injectable()
export class AuthLogOut {
  constructor(private readonly repository: AuthRepository) {}

  async run(id: string): Promise<ApiResponse<null>> {
    try {
      const criteria = new Criteria({ user: { id } });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new AuthNotFoundException();

      await this.repository.update(foundUser[0].user.id, { token: null });

      return {
        message: 'Log out successfully',
        statusCode: 200,
        data: null,
      };
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException]);
    }
  }
}
