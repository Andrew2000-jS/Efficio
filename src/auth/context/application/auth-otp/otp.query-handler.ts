import { IQueryHandler, QueryHandler } from '@shared/context';
import { OtpQuery } from '../../domain/queries';
import { AuthOtp } from './auth-otp.application';

@QueryHandler(OtpQuery)
export class OtpQueryHandler implements IQueryHandler<OtpQuery> {
  constructor(private readonly authOtp: AuthOtp) {}

  async execute(query: OtpQuery): Promise<any> {
    return await this.authOtp.run(query.otp, query.email);
  }
}
