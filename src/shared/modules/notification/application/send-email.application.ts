import { Injectable } from '@shared/utils';
import { NotificationRepository } from '../domain';
import { errorHanlder } from '@shared/context';
import { CannotSendEmailException } from '../domain/exceptions';

@Injectable()
export class SendEmail {
  constructor(private readonly repository: NotificationRepository) {}

  async run(
    from: string,
    to: string,
    subject: string,
    text: string,
  ): Promise<{ accepted: []; rejected: [] }> {
    try {
      const res = await this.repository.sendEmail(from, to, subject, text);

      if (res.rejected.length >= 1) {
        throw new CannotSendEmailException();
      }

      return res;
    } catch (error) {
      errorHanlder(error, [CannotSendEmailException]);
    }
  }
}
