import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_APP_CONSTANTS } from '../../shared';
import { OtpQueryHandler } from '@auth/context/application';
import { OtpDto } from './otp.dto';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class OtpCtr {
  constructor(private readonly otpQueryHandler: OtpQueryHandler) {}

  @Post('otp')
  async run(@Body() body: OtpDto) {
    return await this.otpQueryHandler.execute(body);
  }
}
