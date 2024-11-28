import { Module } from '@nestjs/common';
import {
  UserCreator,
  UserDeleter,
  UserMatcher,
  UserUpdater,
} from '../application';
import { UserRepository } from '../domain';
import { PostgresUserRepository, User } from './persistence';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserCtr,
  DeleteUserCtr,
  MatchUserCtr,
  UpdateUserCtr,
} from 'src/users/app/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserCreator,
    UserUpdater,
    UserDeleter,
    UserMatcher,
    PostgresUserRepository,
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
  ],
  controllers: [CreateUserCtr, UpdateUserCtr, DeleteUserCtr, MatchUserCtr],
})
export class UserModule {}
