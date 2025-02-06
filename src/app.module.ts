import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HealthCheckCtr } from '@shared/app';
import { UserModule } from './users/context/infrastructure';
import { AuthModule } from './auth/context/infrastructure';
import { PostgresModule } from '@shared/modules';
import { TaskModule } from './task/context/infrastructure';

const NODE_ENV =
  process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.test';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: NODE_ENV }),
    JwtModule.register({ secret: process.env.TOKEN_SECRET }),
    PostgresModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [HealthCheckCtr],
  providers: [],
})
export class AppModule {}
