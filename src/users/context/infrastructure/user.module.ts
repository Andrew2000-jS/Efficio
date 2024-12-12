import { Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserRepository } from '../domain';
import { PostgresUserRepository, User } from './persistence';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserCtr,
  DeleteUserCtr,
  MatchUserCtr,
  UpdateUserCtr,
} from 'src/users/app/controllers';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateUserCommandHanlder,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
  UserMatcherQueryHandler,
  UserCreator,
  UserUpdater,
  UserDeleter,
  UserMatcher,
} from '../application';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    EventBus,
    UserCreator,
    UserUpdater,
    UserDeleter,
    UserMatcher,
    CreateUserCommandHanlder,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,
    UserMatcherQueryHandler,
    PostgresUserRepository,
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
  ],
  controllers: [CreateUserCtr, UpdateUserCtr, DeleteUserCtr, MatchUserCtr],
})
export class UserModule {}
