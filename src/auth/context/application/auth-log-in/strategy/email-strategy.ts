import { ApiResponse } from '@shared/context';
import {
  AuthPrimitives,
  AuthRepository,
  AuthUnauthorized,
} from '@auth/context/domain';
import { IEmailStrategy } from './interfaces';
import { SendEmail } from '@shared/modules';
import { generateOTP } from '@shared/utils';

export class EmailStrategy implements IEmailStrategy {
  constructor(private readonly sendEmail: SendEmail) {}

  async execute(auth: AuthPrimitives): Promise<ApiResponse<string>> {
    try {
      const otp = generateOTP();
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        auth.user.email,
        'Your Verification Code',
        `Hi ${auth.user.email},  
      
      Here is your one-time verification code: **${otp}**  
      
      Please use this code to complete your authentication process. If you did not request this, please contact our support team immediately.  
      
      Best regards,`,
      );

      return {
        message:
          'The verification code has been sent to your email. Please check your inbox.',
        statusCode: 200,
        data: otp,
      };
    } catch (error) {
      throw new AuthUnauthorized();
    }
  }
}
