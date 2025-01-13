import { ApiResponse } from '@shared/context';
import { IDigestStrategy } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { AuthPrimitives, AuthUnauthorized } from '@auth/context/domain';
import { compare } from '@shared/utils';

export class DigestStrategy implements IDigestStrategy {
  private readonly jwtService: JwtService = new JwtService({
    secret: process.env.TOKEN_SECRET,
  });

  constructor(public password: string) {}

  async execute(auth: AuthPrimitives): Promise<ApiResponse<string | null>> {
    try {
      const isMatchPwd = compare(this.password, auth.user.password);

      if (!isMatchPwd) {
        throw new AuthUnauthorized();
      }

      const payload = {
        id: auth.id,
        email: auth.user.email,
        userId: auth.user.id,
      };

      const token = this.jwtService.sign(payload);

      return {
        message: 'User authenticated successfully.',
        statusCode: 200,
        data: token,
      };
    } catch (error) {
      throw new AuthUnauthorized();
    }
  }
}
