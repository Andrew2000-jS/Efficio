import { Body, Controller, Post } from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { CreateUserDto } from './create-users.dto';
import { UserErrorHanlder } from '../../shared/decorators';
import { CreateUserCommandHanlder } from 'src/users/context/application';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class CreateUserCtr {
  constructor(
    private readonly createUserCommandHanlder: CreateUserCommandHanlder,
  ) {}

  @Post()
  @UserErrorHanlder()
  async run(@Body() createUserDto: CreateUserDto) {
    return await this.createUserCommandHanlder.execute(createUserDto);
  }
}
