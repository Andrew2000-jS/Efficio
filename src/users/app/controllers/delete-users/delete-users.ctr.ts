import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserErrorHanlder } from '../../shared/decorators';
import { DeleteUserCommandHandler } from 'src/users/context/application';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class DeleteUserCtr {
  constructor(
    private readonly deleteUserCommandHandler: DeleteUserCommandHandler,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserErrorHanlder()
  async run(@Param('id') id: string) {
    return await this.deleteUserCommandHandler.execute({ id });
  }
}
