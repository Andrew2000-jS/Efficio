import { Module } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './persistence/orm/entities';
import {
  AuthCreator,
  AuthDeleter,
  AuthLogIn,
  LoginQueryHandler,
  AuthLogOut,
  LogOutQueryHandler,
  AuthMatcher,
  AuthRecover,
  AuthUpdater,
  CreatedAuthListener,
  DeletedAuthListener,
  MatchAuthQueryHandler,
  RecoverAuthQueryHandler,
  UpdatedAuthListener,
  AuthOtp,
  OtpQueryHandler,
} from '../application';
import { AuthRepository } from '../domain/auth.repository';
import { PostgresAuthRepository } from './persistence/orm/postgres-auth-repository.infrastructure';
import { NotificationModule } from '@shared/modules';
import {
  DigestLoginCtr,
  EmailLoginCtr,
  LogOutCtr,
  OtpCtr,
  RecoverCtr,
} from '@auth/app/controllers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Auth]), NotificationModule],
  providers: [
    EventBus,
    AuthCreator,
    AuthUpdater,
    AuthDeleter,
    AuthMatcher,
    AuthLogIn,
    AuthLogOut,
    AuthRecover,
    AuthOtp,
    CreatedAuthListener,
    UpdatedAuthListener,
    DeletedAuthListener,
    MatchAuthQueryHandler,
    LoginQueryHandler,
    LogOutQueryHandler,
    RecoverAuthQueryHandler,
    OtpQueryHandler,
    {
      provide: AuthRepository,
      useClass: PostgresAuthRepository,
    },
  ],
  controllers: [EmailLoginCtr, DigestLoginCtr, LogOutCtr, RecoverCtr, OtpCtr],
})
export class AuthModule {}
