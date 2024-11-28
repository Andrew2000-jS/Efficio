import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserDeleter } from 'src/users/context/application';
import { UserErrorHanlder } from '../../shared/decorators';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class DeleteUserCtr {
  constructor(private readonly userDeleter: UserDeleter) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserErrorHanlder()
  async run(@Param('id') id: string) {
    return await this.userDeleter.run(id);
  }
}
