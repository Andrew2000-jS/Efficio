import { ApiResponse } from '@shared/context';
import {
  AuthPrimitives,
  AuthRepository,
  AuthUnauthorized,
} from '@auth/context/domain';
import { IEmailStrategy } from './interfaces';
import { SendEmail } from '@shared/modules';

export class EmailStrategy implements IEmailStrategy {
  private readonly sendEmail: SendEmail;
  private readonly repository: AuthRepository;

  async execute(auth: AuthPrimitives): Promise<ApiResponse<null>> {
    try {
      const otp = generateOTP();
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        auth.email,
        'Your Verification Code',
        `Hi ${auth.email},  
      
      Here is your one-time verification code: **${otp}**  
      
      Please use this code to complete your authentication process. If you did not request this, please contact our support team immediately.  
      
      Best regards,`,
      );

      await this.repository.update(auth.id, { otpCode: otp });
      return {
        message:
          'The verification code has been sent to your email. Please check your inbox.',
        statusCode: 200,
        data: null,
      };
    } catch (error) {
      throw new AuthUnauthorized();
    }
  }
}
