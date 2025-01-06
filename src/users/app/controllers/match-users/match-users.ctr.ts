import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { Criteria } from '@shared/context';
import { UserErrorHanlder } from '../../shared/decorators';
import { MatcheUserQueryHandler } from '@users/context/application';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class MatchUserCtr {
  constructor(private readonly matchUserQueryHandler: MatcheUserQueryHandler) {}

  @Post('match')
  @HttpCode(HttpStatus.OK)
  @UserErrorHanlder()
  async run(@Body() body: Record<string, any>) {
    const criteria = new Criteria(body);
    return await this.matchUserQueryHandler.execute({ criteria });
  }
}
