import { Injectable } from '@shared/utils';
import { NotificationRepository } from '../../domain';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationShrdRepository extends NotificationRepository {
  constructor(private readonly mailService: MailerService) {
    super();
  }

  async sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
  ): Promise<{ accepted: []; rejected: [] }> {
    const res = await this.mailService.sendMail({
      from,
      to,
      subject,
      text,
    });

    return res;
  }
}
