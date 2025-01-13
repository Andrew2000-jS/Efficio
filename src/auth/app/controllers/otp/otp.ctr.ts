import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from '../../shared';
import { OtpQueryHandler } from '@auth/context/application';
import { OtpDto } from './otp.dto';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class OtpCtr {
  constructor(private readonly otpQueryHandler: OtpQueryHandler) {}

  @Post('otp')
  @HttpCode(HttpStatus.OK)
  @AuthErrorHanlder()
  async run(@Body() body: OtpDto) {
    return await this.otpQueryHandler.execute(body);
  }
}
