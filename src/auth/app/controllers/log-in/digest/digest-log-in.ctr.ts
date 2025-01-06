import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginQueryHandler } from '@auth/context/application';
import { DigestLoginDto } from './digest-log-in.dto';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from '@auth/app/shared';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class DigestLoginCtr {
  constructor(private readonly loginQueryHandler: LoginQueryHandler) {}

  @Post('digest')
  @HttpCode(HttpStatus.OK)
  @AuthErrorHanlder()
  async run(@Body() digestLoginDto: DigestLoginDto) {
    return await this.loginQueryHandler.execute({
      ...digestLoginDto,
      ctx: 'digest',
    });
  }
}
