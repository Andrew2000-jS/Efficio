import { Controller, Param, Post } from '@nestjs/common';
import { AUTH_APP_CONSTANTS, AuthErrorHanlder } from '../../shared';
import { LogOutQueryHandler } from 'src/auth/context/application';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class LogOutCtr {
  constructor(private readonly logOutQueryHandler: LogOutQueryHandler) {}

  @Post('logout/:id')
  @AuthErrorHanlder()
  async run(@Param('id') id: string) {
    return await this.logOutQueryHandler.execute({ id });
  }
}
