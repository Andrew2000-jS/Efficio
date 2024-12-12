import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserErrorHanlder } from '../../shared/decorators';
import { UpdateUserCommandHandler } from 'src/users/context/application';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class UpdateUserCtr {
  constructor(
    private readonly updateUserCommandHandler: UpdateUserCommandHandler,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UserErrorHanlder()
  async run(@Param('id') id: string, @Body() updateUserDto) {
    return await this.updateUserCommandHandler.execute({
      id,
      ...updateUserDto,
    });
  }
}
