import { ApiResponse } from '@shared/context';
import { IDigestStrategy } from './interfaces';
import { AuthPassword } from 'src/auth/context/domain/value-object';
import { JwtService } from '@nestjs/jwt';
import { AuthPrimitives } from 'src/auth/context/domain/auth.entity';
import {
  AuthNotValidException,
  AuthUnauthorized,
} from 'src/auth/context/domain/exceptions';

export class DigestStrategy implements IDigestStrategy {
  private readonly jwtService: JwtService;

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
