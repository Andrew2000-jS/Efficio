import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserMatcher } from 'src/users/context/application';
import { Criteria } from '@shared/context';
import { UserErrorHanlder } from '../../shared/decorators';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class MatchUserCtr {
  constructor(private readonly userMatcher: UserMatcher) {}

  @Post('match')
  @HttpCode(HttpStatus.OK)
  @UserErrorHanlder()
  async run(@Body() body: Record<string, any>) {
    const criteria = new Criteria(body);
    return await this.userMatcher.run(criteria);
  }
}
