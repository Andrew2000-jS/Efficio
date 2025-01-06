import { ApiResponse } from '@shared/context';
import { IDigestStrategy } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import {
  AuthPrimitives,
  AuthNotValidException,
  AuthUnauthorized,
  AuthPassword,
} from '@auth/context/domain';

export class DigestStrategy implements IDigestStrategy {
  private readonly jwtService: JwtService = new JwtService({
    secret: process.env.TOKEN_SECRET,
  });

  constructor(public password: string) {}

  async execute(auth: AuthPrimitives): Promise<ApiResponse<string | null>> {
    try {
      const isMatchPwd = AuthPassword.comparePassword(
        this.password,
        auth.password,
      );

      if (!isMatchPwd) {
        throw new AuthNotValidException();
      }

      const payload = { id: auth.id, email: auth.email };
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
