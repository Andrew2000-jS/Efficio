import { Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import {
  AuthNotFoundException,
  AutOtpNotValidException,
} from '../../domain/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthOtp {
  private readonly jwtService: JwtService;

  constructor(private readonly repository: AuthRepository) {}

  async run(otp: string, email: string): Promise<ApiResponse<string>> {
    try {
      const criteria = new Criteria({ email });
      const foundAuth = await this.repository.match(criteria);

      if (foundAuth.length < 0) throw new AuthNotFoundException();

      if (foundAuth[0].otpCode !== otp) throw new AutOtpNotValidException();

      const payload = {
        id: foundAuth[0].user.id,
        email: foundAuth[0].user.email,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'User authenticated successfully.',
        statusCode: 200,
        data: token,
      };
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException, AutOtpNotValidException]);
    }
  }
}
