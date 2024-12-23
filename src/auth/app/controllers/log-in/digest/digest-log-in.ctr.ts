import { Body, Controller, Post } from '@nestjs/common';
import { LoginQueryHandler } from 'src/auth/context/application';
import { DigestLoginDto } from './digest-log-in.dto';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from 'src/auth/app/shared';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class DigestLoginCtr {
  constructor(private readonly loginQueryHandler: LoginQueryHandler) {}

  @Post('digest')
  @AuthErrorHanlder()
  async run(@Body() digestLoginDto: DigestLoginDto) {
    return await this.loginQueryHandler.execute({
      ...digestLoginDto,
      ctx: 'digest',
    });
  }
}
