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
  MatcheUserQueryHandler,
  UserCreator,
  UserUpdater,
  UserDeleter,
  UserMatcher,
} from '../application';
import { NotificationModule } from '@shared/modules';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User]), NotificationModule],
  providers: [
    EventBus,
    UserCreator,
    UserUpdater,
    UserDeleter,
    UserMatcher,
    CreateUserCommandHanlder,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,
    MatcheUserQueryHandler,
    PostgresUserRepository,
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
  ],
  controllers: [CreateUserCtr, UpdateUserCtr, DeleteUserCtr, MatchUserCtr],
})
export class UserModule {}
