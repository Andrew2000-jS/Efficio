import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_APP_CONSTANTS } from '../../shared';
import { RecoverAuthQueryHandler } from 'src/auth/context/application';
import { RecoverDto } from './recover.dto';

@Controller(AUTH_APP_CONSTANTS.URL_PREFIX)
export class RecoverCtr {
  constructor(
    private readonly recoverAuthQueryHandler: RecoverAuthQueryHandler,
  ) {}

  @Post('recover')
  async run(@Body() body: RecoverDto) {
    return await this.recoverAuthQueryHandler.execute(body);
  }
}
