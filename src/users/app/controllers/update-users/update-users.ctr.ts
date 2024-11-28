import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserUpdater } from 'src/users/context/application';
import { UserErrorHanlder } from '../../shared/decorators';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class UpdateUserCtr {
  constructor(private readonly userUpdater: UserUpdater) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UserErrorHanlder()
  async run(@Param('id') id: string, @Body() updateUserDto) {
    return await this.userUpdater.run(id, updateUserDto);
  }
}
