import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const NODE_ENV =
  process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.test';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: NODE_ENV }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class PostgresModule {}
