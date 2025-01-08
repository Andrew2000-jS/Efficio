import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginQueryHandler } from '@auth/context/application';
import { EmailLoginDto } from './email-log-in.dto';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from '@auth/app/shared';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class EmailLoginCtr {
  constructor(private readonly loginQueryHandler: LoginQueryHandler) {}

  @Post('email')
  @HttpCode(HttpStatus.OK)
  @AuthErrorHanlder()
  async run(@Body() emailLoginDto: EmailLoginDto) {
    return await this.loginQueryHandler.execute({
      ...emailLoginDto,
      password: null,
      ctx: 'email',
    });
  }
}
