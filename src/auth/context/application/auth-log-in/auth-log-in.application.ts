import { AuthRepository } from '../../domain/auth.repository';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import {
  AuthNotFoundException,
  AuthNotValidException,
  AuthUnauthorized,
} from '../../domain/exceptions';
import {
  DigestStrategy,
  EmailStrategy,
  InvalidContextException,
  LogInContext,
} from './strategy';
import { Injectable, verifyToken } from '@shared/utils';

@Injectable()
export class AuthLogIn {
  constructor(private readonly repository: AuthRepository) {}

  async run(
    email: string,
    password: string,
    ctx: string = 'digest',
  ): Promise<ApiResponse<string | null>> {
    try {
      const criteria = new Criteria({ email });
      const foundUser = await this.repository.match(criteria)[0];
      const loginCtx = new LogInContext();

      if (foundUser && verifyToken(foundUser.token)) {
        return {
          message: 'User authenticated successfully.',
          statusCode: 200,
          data: foundUser.token,
        };
      }

      if (ctx === 'digest') loginCtx.setStrategy(new DigestStrategy(password));

      if (ctx === 'email') loginCtx.setStrategy(new EmailStrategy());

      return loginCtx.execute(foundUser);
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
