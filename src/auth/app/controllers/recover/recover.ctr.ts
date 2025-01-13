import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from '../../shared';
import { RecoverAuthQueryHandler } from '@auth/context/application';
import { RecoverDto } from './recover.dto';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class RecoverCtr {
  constructor(
    private readonly recoverAuthQueryHandler: RecoverAuthQueryHandler,
  ) {}

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  @AuthErrorHanlder()
  async run(@Body() body: RecoverDto) {
    return await this.recoverAuthQueryHandler.execute(body);
  }
}
