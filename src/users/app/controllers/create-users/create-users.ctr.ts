import { Body, Controller, Post } from '@nestjs/common';
import { USER_APP_CONSTANTS } from '../../shared';
import { UserCreator } from 'src/users/context/application';
import { CreateUserDto } from './create-users.dto';
import { UserErrorHanlder } from '../../shared/decorators';

@Controller(USER_APP_CONSTANTS.URL_PREFIX)
export class CreateUserCtr {
  constructor(private readonly userCreator: UserCreator) {}

  @Post()
  @UserErrorHanlder()
  async run(@Body() createUserDto: CreateUserDto) {
    return await this.userCreator.run(createUserDto);
  }
}
