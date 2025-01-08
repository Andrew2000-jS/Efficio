import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import {
  AuthNotFoundException,
  AuthNotValidException,
  AuthUnauthorized,
  AuthRepository,
} from '../../domain';
import {
  DigestStrategy,
  EmailStrategy,
  InvalidContextException,
  LogInContext,
} from './strategy';
import { Injectable } from '@shared/utils';

@Injectable()
export class AuthLogIn {
  constructor(private readonly repository: AuthRepository) {}

  async run(
    email: string,
    password: string,
    ctx: string = 'digest',
  ): Promise<ApiResponse<string | null>> {
    try {
      const criteria = new Criteria({ user: { email } });
      const foundUser = await this.repository.match(criteria);
      const loginCtx = new LogInContext();

      if (foundUser.length < 1) {
        return {
          message: 'Invalid login credentials.',
          statusCode: 400,
          data: null,
        };
      }

      if (ctx === 'digest') loginCtx.setStrategy(new DigestStrategy(password));

      if (ctx === 'email') loginCtx.setStrategy(new EmailStrategy());

      const res = await loginCtx.execute(foundUser[0]);

      await this.repository.update(foundUser[0].user.id, {
        token: res.data,
      });

      return res;
    } catch (error) {
      errorHanlder(error, [
        AuthNotFoundException,
        AuthUnauthorized,
        AuthNotValidException,
        InvalidContextException,
      ]);
    }
  }
}
