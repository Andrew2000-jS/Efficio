import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendEmail } from '../application';
import { NotificationShrdRepository } from './mail/notification-repository.infrastructure';
import { NotificationRepository } from '../domain';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [
    SendEmail,
    NotificationShrdRepository,
    {
      provide: NotificationRepository,
      useClass: NotificationShrdRepository,
    },
  ],
  exports: [SendEmail],
})
export class NotificationModule {}
