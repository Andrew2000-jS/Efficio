import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HealthCheckCtr } from '@shared/app';
import { UserModule } from './users/context/infrastructure';
import { AuthModule } from './auth/context/infrastructure';
import { PostgresModule } from '@shared/modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.register({ secret: process.env.TOKEN_SECRET }),
    PostgresModule,
    AuthModule,
    UserModule,
  ],
  controllers: [HealthCheckCtr],
  providers: [],
})
export class AppModule {}
