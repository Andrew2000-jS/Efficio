import { generateOTP, Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import { AuthNotFoundException } from '../../domain/exceptions';
import { SendEmail } from '@shared/modules';

@Injectable()
export class AuthRecover {
  constructor(
    private readonly repository: AuthRepository,
    private readonly sendEmail: SendEmail,
  ) {}

  async run(email: string): Promise<ApiResponse<string>> {
    try {
      const criteria = new Criteria({ user: { email } });
      const foundAuth = await this.repository.match(criteria);

      if (foundAuth.length < 1) throw new AuthNotFoundException();

      const otp = generateOTP(4);
      await this.repository.update(foundAuth[0].user.id, { otpCode: otp });
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        email,
        'Your Verification Code',
        `Hi ${email},  
      
      Here is your one-time verification code: **${otp}**  
      
      Please use this code to complete your authentication process. If you did not request this, please contact our support team immediately.  
      
      Best regards`,
      );

      return {
        message:
          'The verification code has been sent to your email. Please check your inbox.',
        statusCode: 200,
        data: otp,
      };
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException]);
    }
  }
}
